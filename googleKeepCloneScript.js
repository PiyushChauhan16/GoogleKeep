
    document.querySelector ("#file_icon").innerHTML = "&#xf249";

    const note_div_ref = document.querySelector (".note_div");
    const addBt_ref = document.querySelector (".learn_more");
  
    const createNote = () => {
        console.log ("inCreateNote");
        const noteData = `
        <div class = "note">
            <button class = "editBt"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class = "trashBt"><i class="fa-solid fa-trash"></i></button>
            <button class = "saveBt"><i class="fa-solid fa-floppy-disk"></i></button>
            
            <textarea class = "txt_area" name = "txt" rows = "8" cols = "30"></textarea>
            <div class = "main hidden"></div>

        </div>`;

        

        note_div_ref.insertAdjacentHTML ("beforeend", noteData);

    }
    addBt_ref.addEventListener ('click', createNote);
    


    
    note_div_ref.addEventListener ("click", function (event){
        
        if (event.target && (event.target.matches ('.trashBt') || event.target.matches (".fa-trash"))){
            const note = event.target.closest ('.note');
            
            if (note){
                note.remove ();
            }

            updateLSData ();
        }

        if (event.target && (event.target.matches (".saveBt") || event.target.matches (".fa-floppy-disk"))){
            const note = event.target.closest (".note");
            const txt_area = note.children[3];
            const main_div = note.children[4];

            const txt_data = txt_area.value;
           
            txt_area.classList.add ("hidden");
            main_div.classList.remove ("hidden");
            
            main_div.innerHTML =txt_data;
           
        }

        if (event.target && (event.target.matches (".editBt") || event.target.matches (".fa-pen-to-square"))){
            const note = event.target.closest (".note");
            const txt_area = note.children[3];
            const main_div = note.children[4];

            txt_area.classList.remove ("hidden");
            main_div.classList.add ("hidden");
           
        }
    })





    const updateLSData = () => {
        const alltxt_area = document.querySelectorAll (".txt_area");

        const alltxt_data = [];

        for (let txt_area of alltxt_area){
            if (txt_area.value != "")
            alltxt_data.push (txt_area.value);
        }

        
        localStorage.setItem ("MyData", JSON.stringify (alltxt_data));
    }

    note_div_ref.addEventListener ("change", (event) => {
        if (event.target && event.target.matches (".txt_area")){
            updateLSData ();
        }
        
    })
    






    const createNoteForLS = (text) => {        
        console.log (`inCreateNoteForLS with text: ${text}`);
        const noteData = `
        <div class = "note">
        <button class = "editBt"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class = "trashBt"><i class="fa-solid fa-trash"></i></button>
        <button class = "saveBt"><i class="fa-solid fa-floppy-disk"></i></button>
        
            
            <textarea class = "txt_area" name = "txt" rows = "8" cols = "30"></textarea>
            <div class = "main"></div>

        </div>`;

        

        note_div_ref.insertAdjacentHTML ("afterbegin", noteData);

        
        if (typeof(text) == typeof ("")){
            let flag = 0;
            
            for (let x of text){
                if (x != " " ) {
                    flag = 1;
                }
            }

            console.log (`text: "${text}" flag: ${flag}`);
            if (flag){
                console.log ("in");
                document.querySelector(".main").classList.remove ("hidden");
                document.querySelector(".txt_area").classList.add ("hidden");
                document.querySelector (".main").innerHTML = text;
                document.querySelector (".txt_area").value = text;

                console.log (document.querySelector (".txt_area").value);
            }
            else {
                
                note_div_ref.removeChild (note_div_ref.lastElementChild);
            }
        }

        
    }

    if (localStorage.getItem ("MyData") != null){
        const getDataFromLS = JSON.parse (localStorage.getItem ("MyData"));
        
        for (let x of getDataFromLS){
            
            if (x != "")
            createNoteForLS (x);
        }
        
    }
    
    createNote ();
