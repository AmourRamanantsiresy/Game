window.addEventListener(`load`, function() {

    let list = [
        [
            `Semestre 1`, `WEB1`, `SYS1`, `MGT1`
        ],
        [
            `Semestre 2`, `WEB2`, `SYS2`, `MGT2`
        ]
    ]
        
    
    let table = document.querySelector(`table`);

    for(let i = 0; i < list.length; i++){
        for(let j = 0; j < list[i].length; j++){
            if(j == 0){
                table.innerHTML += "<tr><th>"+list[i][j]+"</th></tr>"
            }
            else table.innerHTML += "<td>"+list[i][j]+"</td>"
        }
    }

})