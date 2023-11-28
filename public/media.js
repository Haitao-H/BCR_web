const boxSelector = document.querySelectorAll('.box-selector');


fetch('/media/category')
    .then((res) => res.json())
    .then((data) => {
        let categoryList = data.data;

        for (let i = 0; i < categoryList.length; i++) {
            let endpoint = '/media/' + categoryList[i];

            fetch(endpoint)
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data.data)
                    const list = data.data;
                    let html = ``;
                    list.forEach(element => {
                        html += `
                <label><input type='checkbox' class='common-selector ${categoryList[i]}' value='${element}'>${element}</label>
                <br>`
                    });
                    boxSelector[i].innerHTML = html;
                })
        }

    });

filterData();

function filterData() {
    const species = getFilter('species');
    const year = getFilter('year');
    const date = getFilter('date');
    const url = getFilter('url');
    const format = getFilter('format')
    console.log(species)
    console.log(year)

    $.ajax({
        url: '/media/result',
        method: 'GET',
        data: {
            species,
            year,
            date,
            url, 
            format
        },
        success: function (result) {
            let html = ``;
            if (result.message == 'success') {
                let data = result.data;
                // console.log(data);
                data.forEach((record) => {

                    html += `<div class="single-record">`
                    if(record.type=="image"){
                        html += `<img src="${record.url}">`
                    }
                    if(record.format=="audio"){
                        html += `<audio controls>
                        <source src="${record.url}" type="audio/mpeg">
                        Your browser does not support the audio element.
                        </audio>`
                    }
                    html+= `<h4>${record.year}.${record.month}.${record.day} </h4>
                            <h4>${record.commonName} </h4>
                            <h4>${record.locality}</h4></div>`
                    

                    // console.log(record);
                })

            }
            document.querySelector('.content-container').innerHTML = html;
        }
    })


}

function getFilter(className) {
    let filter = [];
    let commonSelector = document.querySelectorAll(`.common-selector.${className}:checked`);
    commonSelector.forEach((e) => {
        filter.push(e.value);
    })
    return filter;
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('common-selector')) {
        filterData();
    }
})


// collapsible content

let collaps = document.getElementsByClassName("collapsible");

for(let i = 0; i<collaps.length; i++){
    collaps[i].addEventListener("click", function(){
        this.classList.toggle("active");
        let selectors = this.nextElementSibling;

        if (selectors.style.maxHeight){
            selectors.style.maxHeight = null;
          } else {
            selectors.style.maxHeight = selectors.scrollHeight + "px";
          }
    })
}