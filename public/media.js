const boxSelector = document.querySelectorAll('.box-selector');

// fetch selectors in the filter content
fetch('/media/category')
    .then((res) => res.json())
    .then((data) => {
        let categoryList = data.data;

        for (let i = 0; i < categoryList.length; i++) {
            let endpoint = '/media/' + categoryList[i];
            // console.log(endpoint);

            // fetch all the selectors in each category
            fetch(endpoint)
                .then((res) => res.json())
                .then((data) => {
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



// send query to the server

filterData();

function filterData() {
    const species = getFilter('species');
    const year = getFilter('year');
    const date = getFilter('date');
    const url = getFilter('url');
    const format = getFilter('format')

    const page = document.getElementById('current');
    const currentPage = page.innerText;
    const previous = document.getElementById('previous');
    const next = document.getElementById('next');
    const limit = 30;

    $.ajax({
        url: '/media/result',
        method: 'GET',
        data: {
            species,
            year,
            date,
            url,
            format,
            page: currentPage,
            limit
        },
        success: function (result) {

            // output the result
            let html = ``;
            if (result.message == 'success') {

                // get the number of result
                const counter = result.counter;
                const totalPage = Math.ceil(counter / limit);
                document.getElementById('status-box').innerHTML = `Total result: <span id="totalResult">${counter}</span>  &emsp; 
                                                                    Total Page: <span id="totalPage">${totalPage}</span> &emsp; 
                                                                    Result Per Page: <span id="totalPage">${limit}</span> &emsp; 
                                                                    Current Page: <span id="currentPage" style="font-weight: bold;">${currentPage}</span>`;

                const data = result.data;
                data.forEach((record) => {
                    html += `<div class="single-record">`
                    if (record.url) {
                        if (record.format == "Photo") {
                            html += `<img src="${record.url}">`
                        }
                        if (record.format == "Audio") {
                            html += `<audio controls style="width: 60%;">
                            <source src="${record.url}" type="audio/mpeg">
                            Your browser does not support the audio element.
                            </audio>`
                        }
                    }
                    html += `<h4>Date: ${record.year}.${record.month}.${record.day} </h4>
                            <h4>Specie: ${record.commonName} </h4>
                            <h4>Location: ${record.locality}</h4></div>`
                })



                if (totalPage == 1 || currentPage == 1) {
                    previous.style.display = 'none';
                } else {
                    previous.style.display = 'inline-block';

                }

                if (currentPage == totalPage) {
                    next.style.display = 'none';
                } else {
                    next.style.display = 'inline-block';

                }

            } else {
                html += `<div style="padding: 20px;">Nothing Found, Please Try Again Later...</div>`
            }
            document.querySelector('.result-container').innerHTML = html;



        }
    })


}

function getFilter(className) {
    let filter = [];
    let commonSelector = document.querySelectorAll(`.common-selector.${className}:checked`);
    commonSelector.forEach((e) => {
        let element = `"${e.value}"`;
        filter.push(element);
    })

    return filter;
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('common-selector')) {
        document.getElementById('current').innerText = 1;
        filterData();
    }
})


// refresh the pagination button and get the result
const page = document.getElementById('current');

document.getElementById('previous').addEventListener("click", () => {
    page.innerText = parseInt(page.innerHTML) - 1;
    filterData();
})

document.getElementById('next').addEventListener("click", () => {
    page.innerText = parseInt(page.innerHTML) + 1;
    filterData();
})

document.getElementById('first').addEventListener("click", () => {
    page.innerText = 1;
    filterData();
})

document.getElementById('last').addEventListener("click", () => {
    page.innerText = document.getElementById('totalPage').innerText;
    filterData();
})



// collapsible content

let collaps = document.getElementsByClassName("collapsible");

for (let i = 0; i < collaps.length; i++) {
    collaps[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let selectors = this.nextElementSibling;

        if (selectors.style.maxHeight) {
            selectors.style.maxHeight = null;
        } else {
            selectors.style.maxHeight = selectors.scrollHeight + "px";
        }
    })
}
