const name = document.getElementById('welcome_header_name');
const addNoteBtn = document.getElementById('empty_add');
const closeBtn = document.getElementById('close_div');
const mainDiv = document.getElementById('main')
const addNoteModal = document.getElementById('add_note_modal');

const navbar = document.getElementById('navbar');
var noteText = document.getElementById('note');
const addNote = document.getElementById('add_note');
const resMsg = document.getElementById('res-msg');

const emptyNotesDiv = document.getElementById('empty_notes_div');
const filledAddNoteBtn = document.getElementById('add_note_btn');
const filledNotesDiv = document.getElementById('filled_notes_div');

// EDIT
var editNoteID;
const editNoteModal = document.getElementById('edit_note_modal');
const editNoteBtn = document.getElementById('edit_note_btn');
const editedText = document.getElementById('editedText');
const editCloseBtn = document.getElementById('edit_close_btn');
const editResMsg = document.getElementById('edit-res-msg');


const getNotes = async () => {
    try {
        const token = localStorage.getItem('token');
    
        const notes = await axios.get('/dashboard/notes',{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
    
        if (notes.data.data.length == 0)  {
            emptyNotesDiv.style.display = 'flex';
            filledAddNoteBtn.style.display = 'none';
            filledNotesDiv.style.display = 'none';
        }
        else {
            emptyNotesDiv.style.display = 'none';
            filledAddNoteBtn.style.display = 'block';
            filledNotesDiv.style.display = 'flex';

            filledNotesDiv.innerHTML = '';
            
            for (let i = 0;  i < notes.data.data.length; i++){

                var div = document.createElement('div');
                div.classList.add('note_content');
                
                var editBtn = document.createElement('button');
                editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
                editBtn.classList.add('edit_note');
                
                const stringedID = notes.data.data[i]._id.toString();

                editBtn.setAttribute('onclick',`editNote("${stringedID}")`);
                
                var deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
                deleteBtn.classList.add('delete_note');
                deleteBtn.setAttribute('onclick',`deleteNote("${stringedID}")`)


                var heading = document.createElement('h1');
                heading.innerText = `${notes.data.data[i].title}`
                heading.classList.add('note_content_title');
                var date = document.createElement('p');
                date.innerText = `${notes.data.data[i].createdAt}`
                date.classList.add('createdAt');
                
                div.appendChild(editBtn);
                div.appendChild(deleteBtn);
                div.appendChild(heading);
                div.appendChild(date);

                filledNotesDiv.appendChild(div);
            }
        }

        const username = notes.data.name;
        name.innerText = username.charAt(0).toUpperCase() + username.slice(1);


    } catch (err){
        console.log(err.response.data.msg);
    }
}
getNotes();


const editNote = (id) => {
    editNoteID = id;
    mainDiv.classList.add('main_extra');
    navbar.classList.add('navbar_extra');
    editNoteModal.style.display = 'flex'; 
}

editNoteBtn.addEventListener('click',async () => {
    const token = localStorage.getItem('token');

    try {
        const editedNote = await axios.put('/dashboard/notes',{
            noteID : editNoteID,
            title : editedText.value
        },{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        editResMsg.innerText = 'Note edited';
        editResMsg.style.color = '#6a994e';
        editNoteBtn.disabled = true;
        editNoteBtn.style.backgroundColor = '#a4c3b2';

        getNotes();
    } catch (err){
        editResMsg.innerText = 'Please add a new note';
        editResMsg.style.color = '#f95738';
        editNoteBtn.disabled = false;
        editNoteBtn.style.backgroundColor = '#ffdd00';
    }

})

const deleteNote = async (id) => {
    const token = localStorage.getItem('token');

    try {
        const res = await axios.delete('/dashboard/notes',{
            data : {
                noteID : id
            },
            headers : {
                Authorization : `Bearer ${token}`
            }
        })


        getNotes();

    } catch (err){
        console.log(err);
    }
}



addNote.addEventListener('click',async () => {
    const token = localStorage.getItem('token');

    try {
        const note = await axios.post('/dashboard/notes',{
            title : noteText.value
        },{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })


        resMsg.innerText = 'Note added';
        resMsg.style.color = '#6a994e';
        addNote.disabled = true;
        addNote.style.backgroundColor = '#a4c3b2';

        getNotes();

    } catch (err){
        resMsg.innerText = 'Please add a note';
        resMsg.style.color = '#f95738';
        addNote.disabled = false;
        addNote.style.backgroundColor = '#ffdd00';
    }
});





addNoteBtn.addEventListener('click',() => {
    mainDiv.classList.add('main_extra');
    navbar.classList.add('navbar_extra');
    addNoteModal.style.display = 'flex';
})

filledAddNoteBtn.addEventListener('click',() => {
    mainDiv.classList.add('main_extra');
    navbar.classList.add('navbar_extra');
    addNoteModal.style.display = 'flex';
})

const closeNoteModal = () => {
    mainDiv.classList.remove('main_extra');
    navbar.classList.remove('navbar_extra');
    addNoteModal.style.display = 'none';
    resMsg.innerText = '';
    noteText.value = '';
    addNote.disabled = false;
    addNote.style.backgroundColor = '#ffdd00';
}

closeBtn.addEventListener('click',() => {
    closeNoteModal();
})

document.addEventListener('keydown',(e) => {
    if (e.key === 'Escape'){
        closeNoteModal();
        closeEditNoteModal();
    }
})

const closeEditNoteModal = () => {
    mainDiv.classList.remove('main_extra');
    navbar.classList.remove('navbar_extra');
    editNoteModal.style.display = 'none';
    editResMsg.innerText = '';
    editedText.value = '';
    editNoteBtn.disabled = false;
    editNoteBtn.style.backgroundColor = '#ffdd00';
}

editCloseBtn.addEventListener('click',() => {
    closeEditNoteModal();
})