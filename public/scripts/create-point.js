
// CALLBACK DE ESTADOS E CIDADES

function getUFs(){
    const ufs_select = document.querySelector('select[name=uf]')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome ")
    .then((res)=>{ return res.json() }) // função anônima que retorna algo
    //ou .then( res => res.json() )
    .then( states => {
        for(let state of states){
            ufs_select.innerHTML +=`<option value = "${state.id}">${state.nome}</option>`
        }
       
    } )
}

getUFs()

function getCities(event){
    const cities_select = document.querySelector('select[name=city]')
    const state_input = document.querySelector('input[name=state]')
    
    cities_select.disabled = false
    
    const uf_value = event.target.value 

    const indexof_stateselected = event.target.selectedIndex
    state_input.value = event.target.options[indexof_stateselected].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf_value}/municipios`

    cities_select.innerHTML =`<option value = "">Selecione a Cidade</option>`
    
    fetch(url)
    .then((res)=>{ return res.json() }) // função anônima que retorna algo
    //ou .then( res => res.json() )
    .then( cities => {

        for(let city of cities){
            cities_select.innerHTML +=`<option value = "${city.nome}">${city.nome}</option>`
        }

       
    } )
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)

    
//  ITENS DE COLETA

// atribuir à variável todos os li
const itemstoColect = document.querySelectorAll('.items-grid li')

// para cada li será ativado o .appEventListener
for(let item of itemstoColect){
    // o qual aplica a função handleSelectedItem 
    // toda vez que algum li for clickado
    item.addEventListener('click', handleSelectedItem)
}

let selectedItems = []
let colectedItems = document.querySelector('input[name=items]')

function handleSelectedItem(event){

    const itemLi = event.target

    //adiciona ou remove classe 
    itemLi.classList.toggle('selected')

    const itemId = itemLi.dataset.id

    // verificar se existem itens selecionados, se sim, pega-los
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    } )

    // caso o item esteja selecionado
    if(alreadySelected >= 0){
        //tirar da seleção
        const filtereditems = selectedItems.filter( item => {
            const itemDiferent = item != itemId
            return itemDiferent
        } )
        selectedItems = filtereditems

    // caso o item não esteja selecionado
    } else {
        //selecionar
        selectedItems.push(itemId)
    }

    // atualizar o input escondido com os itens selecionados
    colectedItems.value = selectedItems
}
