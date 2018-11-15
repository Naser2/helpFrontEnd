document.addEventListener("DOMContentLoaded", init);

function init() {
  const userId = 1
  const BASE_URL = "http://localhost:3000/api/v1/users"
  const USER_URL = `${BASE_URL}/${userId}`
  const NOTES_URL = "http://localhost:3000/api/v1/notes"



  let getNoteId;
  let editNotes;
  const newNotesForm = document.querySelector(".new-post-form"),
        nameTag = document.querySelector("#user-name-and-id"),
        notesTag = document.querySelector("#notes");


  fetch(USER_URL)
  .then(user => user.json())
  .then(user => {
    let userId = user.id
    renderUser(user)
  });

  // RENDER USER && ITTERATED NOTES
  function renderUser(user) {
    nameTag.textContent = user.name
    nameTag.setAttribute( `data-id`, `${user.id}`)
    user.notes.forEach( note => {
      renderNote(note)
    })
  }

  // RENDER A NOTE
  function renderNote(note){
    const notesLi = document.createElement("div");
    notesLi.setAttribute('class', 'noteContainer')
    notesLi.innerHTML += `
                            <p class=title data-id=${note.id}>${note.title} </p>
                            <div style="display: none;" data-id=${note.id} >${note.body}</div>
                          `

     // debugger



   const addSpan = document.createElement('span')
   addSpan.setAttribute('class', 'add-note')
   addSpan.setAttribute('style', 'color:red;font-weight:bold')
   addSpan.innerHTML = 'Add'

     // console.log(pTag);
    const editSpan = document.createElement('span');
    editSpan.setAttribute('class', 'edit-note');
    editSpan.setAttribute('id', note.id);
    editSpan.setAttribute('style', 'color:orange;font-weight:bold');
    editSpan.innerHTML = 'Edit';

    const deleteSpan = document.createElement('span')
    deleteSpan.setAttribute('class', 'delete-note')
    deleteSpan.setAttribute('style', 'color:red;font-weight:bold')
    deleteSpan.innerHTML = 'Delete'


  // // pTag = document.getElementsByClassName('title')
  //       for (var i = 0; i < pTag.length; i++) {
  //           pTag[i].prependChild(editSpan)
  //           pTag[i].appendChild(deleteSpan)
  // }
    // pTag.prependChild(editSpan)
    // console.log(pTag);
    notesTag.appendChild(notesLi);
    notesTag.appendChild(editSpan);
    notesTag.appendChild(deleteSpan)
    notesTag.appendChild(addSpan)
   }


   document.addEventListener('click', handleClick)
    function handleClick(e){
     if(e.target.className === "title"){
       const noteBody = e.target.nextElementSibling.textContent
        document.querySelector('#note-body').innerHTML = `<p class="note-content">${noteBody} </p>`
     }

     if(e.target.className === "edit-note"){
     const noteId = e.target.id;
     const noteTitle = e.target.previousElementSibling.children[0].textContent;
     const noteBody = e.target.previousElementSibling.children[1].textContent;
       document.querySelector('#note-body').innerHTML = `<h1> Edit your note</h1>
                     <form id=edit-note-form>
                       <textarea id="title-edit" name=text-area> ${noteTitle}</textarea>
                       <textarea id="body-edit" name=text-area> ${noteBody}</textarea>
                       <button type=submit id=save >Done</button>
                     </form>`
       update(noteId)

     }
     // debugger
     if(e.target.className === "delete-note"){
       noteId = e.target.previousElementSibling.id
       deleteNote(noteId)
     }
     if(e.target.className === "add-note"){
       addTag = document.querySelector('#addformtag')
       console.log(addTag);

       let newNotesForm = `<form class="new-note-form" >
               <br>
               <input class="new-post-title" type="text" name="title" placeholder="title" value=""><br>
               Write a note: <br>
               <textarea class="new-post-body" rows="4" cols="50">
               </textarea>
               <input type="submit" name="add-post" value="Submit">
             </form>`

      // debugger


      addTag.innerHTML = newNotesForm
      // addTag.setAttribute(<style media="screen">
      //  #addformtag {
      //    position: relative;
      //  }
      //
      //  #addformtag  {
      //    position: absolute;
      //    top: 0;
      //    left: 0;
      //  }
      // </style>)
      // console.log(addTag);
       let userId = e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[0].dataset.id
       addNewNote()
     }
   }


   // UPDATE
   function update(noteId){
     document.querySelector("#edit-note-form").onsubmit = (e)=> {
       const title = document.querySelector("#title-edit").value
       const body = document.querySelector("#body-edit").value
      //console.log(note);
       fetch(`${NOTES_URL}/${noteId}`,{
         method: "PATCH",
         headers:{
           "Content-Type": "application/json",
           Accept: "application/json"
         },
         body: JSON.stringify({title, body})
       })
       .then(note => note.json())
       .then(note => {})
     }
   }

   function deleteNote(noteId){
     // console.log("user clicked Delete", noteId);
    fetch(`${NOTES_URL}/${noteId}`, {
      method: "DELETE",
    })
     .then(alert("Successful delete"))

   }

  // NEW
   // newNotesForm.addEventListener("submit", addNewNote)

   function addNewNote(e){
     // e.preventDefault();
     // debugger
     let title = e.target.parentNode.parentNode.parentNode.parentElement.children[4].children[0].value
     let body = e.target.parentNode.parentNode.parentNode.parentElement.children[4].children[1].value
      // console.log(user.notes)

     let note = {
       user_id: userId,
       title,
       body
     };
     fetch(NOTES_URL, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json "
       },
       body: JSON.stringify(note)
     }).then(note => note.json())
       .then(note => renderNote(note))
   }

}
