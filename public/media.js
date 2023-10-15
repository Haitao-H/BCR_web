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
    // console.log(species)
    // console.log(year)

    $.ajax({
        url: '/media/result',
        method: 'GET',
        data: {
            species,
            year
        },
        success: function (result) {
            let html = ``;
            if (result.message == 'success') {
                let data = result.data;
                // console.log(data);
                data.forEach((record) => {

                    html += `<div class="single-record">${record._id}`
                    if(record.isCrab){
                        html += `<h4>Crab</h4>`
                    }
                    if(record.isParrot){
                        html += `<h4>Parrot</h4>`
                    }
                    html+= `<h4>${record.year}</h4></div>`
                    // console.log(record)
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

