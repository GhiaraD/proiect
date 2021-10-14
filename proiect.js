let container = document.getElementById("list")
let editText = document.getElementById("input_text")
let allBtn = document.getElementById("all")
let activeBtn = document.getElementById("active")
let completedBtn = document.getElementById("completed")
let score = document.getElementById("scor")
let arrow = document.getElementById("arrow")
let box2 = document.getElementById("box2")
let decor1 = document.getElementById("div_decor1")
let decor2 = document.getElementById("div_decor2")
let clear = document.getElementById("clear")
let children = [];
let actives = children.filter(element => element.active === true)
let completes = children.filter(element => element.active === false)
let numb = 0

function heavy_arrow() {
    if (children.length === completes.length && children.length > 0)
        arrow.src = "Resources/arrow.png"
    else arrow.src = "Resources/arrow_light.png"
}

function hide_arrow() {
    if (children.length == 0)
        arrow.style.visibility = "hidden"
    else arrow.style.visibility = "visible"
}
hide_arrow()

function hide_clear() {
    if (completes.length == 0)
        clear.style.visibility = "hidden"
    else clear.style.visibility = "visible"
}

function hide_boxes() {
    if (children.length == 0) {
        box2.style.display = "none"
        decor1.style.display = "none"
        decor2.style.display = "none"
    } else {
        box2.style.display = "flex"
        decor1.style.display = "block"
        decor2.style.display = "block"
    }
}
hide_boxes()

function update_lists() {
    actives = children.filter(element => element.active === true)
    completes = children.filter(element => element.active === false)
}

allBtn.addEventListener('click', event => {
    if (allBtn.classList.contains("checked")) return
    else {
        allBtn.classList.add("checked")
        activeBtn.classList.remove("checked")
        completedBtn.classList.remove("checked")
        afisare()
    }
})

activeBtn.addEventListener('click', event => {
    if (activeBtn.classList.contains("checked")) return
    else {
        activeBtn.classList.add("checked")
        allBtn.classList.remove("checked")
        completedBtn.classList.remove("checked")
        afisare()
    }
})

completedBtn.addEventListener('click', event => {
    if (completedBtn.classList.contains("checked")) return
    else {
        completedBtn.classList.add("checked")
        activeBtn.classList.remove("checked")
        allBtn.classList.remove("checked")
        afisare()
    }
})

editText.addEventListener('keypress', event => {
    // console.log('apasat "' + event.key + '"')
    let string = editText.value.trim();
    if (event.key == 'Enter' && string.length != 0) {
        children.push({ "active": true, "text": string, "id": numb++ });
        update_lists()
        afisare()
        editText.value = ''
    }
})

arrow.addEventListener('click', event => {
    ok = 0
    children.forEach(function(obj) {
        if (obj.active === true) ok = 1
        obj.active = false
    });
    if (ok === 0) {
        children.forEach(function(obj) {
            obj.active = true
        });
    }
    update_lists()
    afisare();
})

clear.addEventListener("click", event => {
    for (var i = children.length - 1; i >= 0; i--) {
        var obj = children[i];
        if (obj.active === false) {
            children.splice(i, 1)
        }
    }
    update_lists()
    afisare()
})

function afisare() {
    console.log(children)
    console.log(actives)
    console.log(completes)
    container.innerHTML = ''
    hide_boxes()
    hide_clear()
    hide_arrow()
    heavy_arrow()
    if (activeBtn.classList.contains("checked")) {
        for (let i = 0; i < actives.length; ++i) {
            let current = actives[i];
            let continutText = current.text
            let aidi = current.id

            let hr = document.createElement("hr")
            hr.classList.add("solid")
            hr.classList.add("no_margin")
            let newElem = document.createElement("div");
            let check = document.createElement("img")
            let text = document.createElement("p")
            let cross = document.createElement("img")

            newElem.classList.add("box")

            check.src = "Resources/cerc_gol.png"
            check.classList.add("icon_mai_mare")
            check.addEventListener("click", event => {
                press_check(current, check, text)
            })

            text.classList.add("todo_text")
            text.textContent = continutText
            text.contentEditable = "false"
            text.addEventListener("dblclick", event => {
                text.contentEditable = "true"
                check.style.visibility = 'hidden'
            })

            text.addEventListener("blur", event => {
                text.contentEditable = "false"
                check.style.visibility = 'visible'
            })

            cross.src = "Resources/x.png"
            cross.classList.add("icon_mai_mic")

            cross.addEventListener("click", event => {
                press_x(aidi)
            })

            newElem.append(check)
            newElem.append(text)
            newElem.append(cross)

            container.appendChild(hr)
            container.appendChild(newElem)
        }
    } else if (completedBtn.classList.contains("checked")) {
        for (let i = 0; i < completes.length; ++i) {
            let current = completes[i];
            let continutText = current.text
            let aidi = current.id

            let hr = document.createElement("hr")
            hr.classList.add("solid")
            hr.classList.add("no_margin")
            let newElem = document.createElement("div");
            let check = document.createElement("img")
            let text = document.createElement("p")
            let cross = document.createElement("img")

            newElem.classList.add("box")

            check.src = "Resources/cerc_cu_bifa.png"
            check.classList.add("icon_mai_mare")
            check.addEventListener("click", event => {
                press_check(current, check, text)
            });

            text.classList.add("todo_text_checked")
            text.textContent = continutText
            text.contentEditable = "false"
            text.addEventListener("dblclick", event => {
                text.contentEditable = "true"
                check.style.visibility = 'hidden'
            })

            text.addEventListener("blur", event => {
                text.contentEditable = "false"
                check.style.visibility = 'visible'
            })

            cross.src = "Resources/x.png"
            cross.classList.add("icon_mai_mic")
            cross.addEventListener("click", event => {
                press_x(aidi)
            })

            newElem.append(check)
            newElem.append(text)
            newElem.append(cross)

            container.appendChild(hr)
            container.appendChild(newElem)
        }
    } else {
        for (let i = 0; i < children.length; ++i) {
            let current = children[i];
            let continutText = current.text
            let special = current.active
            let aidi = current.id

            let hr = document.createElement("hr")
            hr.classList.add("solid")
            hr.classList.add("no_margin")
            let newElem = document.createElement("div");
            let check = document.createElement("img")
            let text = document.createElement("p")
            let cross = document.createElement("img")

            newElem.classList.add("box")

            if (special === false) {
                check.src = "Resources/cerc_cu_bifa.png"
                text.classList.add("todo_text_checked")
            } else {
                check.src = "Resources/cerc_gol.png"
                text.classList.add("todo_text")
            }
            check.classList.add("icon_mai_mare")

            check.addEventListener("click", event => {
                press_check(current, check, text)
            });

            text.textContent = continutText
            text.contentEditable = "false"
            text.addEventListener("dblclick", event => {
                text.contentEditable = "true"
                check.style.visibility = 'hidden'
            })

            text.addEventListener("blur", event => {
                text.contentEditable = "false"
                check.style.visibility = 'visible'
            })

            cross.src = "Resources/x.png"
            cross.classList.add("icon_mai_mic")
            cross.addEventListener("click", event => {
                press_x(aidi)
            })

            newElem.append(check)
            newElem.append(text)
            newElem.append(cross)

            container.appendChild(hr)
            container.appendChild(newElem)
        }
    }
    score.textContent = actives.length
}

function press_x(id) {
    for (var i = 0; i < children.length; i++) {
        var obj = children[i];
        if (obj.id === id) {
            nr = i
            break
        }
    }
    children.splice(nr, 1)
    update_lists()
    afisare()
}

function press_check(current, check, text) {

    if (current.active === true) {
        current.active = false
        check.src = "Resources/cerc_cu_bifa.png"
        text.classList.remove("todo_text")
        text.classList.add("todo_text_checked")
    } else {
        current.active = true
        check.src = "Resources/cerc_gol.png"
        text.classList.remove("todo_text_checked")
        text.classList.add("todo_text")
    }
    update_lists()
    afisare();
}