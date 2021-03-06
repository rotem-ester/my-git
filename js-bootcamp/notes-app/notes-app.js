let notes = getSavedNotes()

const filters = {
    searchText: ''
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', function(e){
    const note = {
        uid: uuidv4(),
        title: '',
        body: '',
        created: new Date().getTime(),
        lastChanged: new Date().getTime()
    }
    notes.push(note)
    saveNotes(notes)
    location.assign(`./edit.html#${note.uid}`)
})

document.querySelector('#search-text').addEventListener('input', function(e){
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', function(e){
    console.log(e.target.value)
})

window.addEventListener('storage', function(e){
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

const now = moment()
console.log(now.toString())
