//read existing notes from local storage
const getSavedNotes = function(){
    const notesJSON = localStorage.getItem('notes')
    
    if (notesJSON !== null){
        return JSON.parse(notesJSON)
    } else {
        return []
    }

}

//save notes to local storage
const saveNotes = function(notes){
    localStorage.setItem('notes', JSON.stringify(notes))
}

//remove a note from the list
const removeNote = function(uid){
    const noteIndex = notes.findIndex(function(note){
        return note.uid === uid
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

//generate the DOM structure for a note
const generateNoteDOM = function(note){
    const noteEl = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')

    //setup the remove note button
    button.textContent = 'x'
    noteEl.appendChild(button)
    button.addEventListener('click', function(){
        removeNote(note.uid)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    //setup the note title text
    if (note.title.length > 0){
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.setAttribute('href', `./edit.html#${note.uid}`)
    noteEl.appendChild(textEl)

    return noteEl
}

//render application notes
const renderNotes = function(notes, filters){
    const filteredNotes = notes.filter(function (note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function(note){
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}