fetch('./js/data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const mainElement = document.getElementById('main')
        const html = data.map(obj => {
            //  destructure data to use in html 
            const { id, company, logo, isnew, featured, position, role, level, postedAt, contract, location, languages, tools } = obj
            //  create main div
            const createElem = document.createElement('div');
            // set id for each divs
            createElem.setAttribute('id', `${id}`)
            console.log(createElem)
            createElem.className = 'bg-white pl-4 flex flex-col md:flex-row md:justify-between md:py-5 md:px-6 md:items-center gap-2 justify-between shadow-xl  container mx-auto border-l-4 rounded-md pb-3 border-l-desaturatedDarkCyan'
            // create inner div
            const innerDiv = document.createElement('div')
            innerDiv.className = 'flex flex-col gap-2 md:mr-7 md:flex-row md:gap-4 md:items-center'
            // create image
            const profileImg = document.createElement('img')
            profileImg.className = 'w-12 -mt-6 md:mt-0 md:w-20'
            profileImg.src = `${logo}`
            innerDiv.appendChild(profileImg)
            // create innerdiv content
            const innerDivContent = document.createElement('div')
            innerDivContent.className = 'flex flex-col items-start justify-start'
            // create div inside innerdivContent
            const nestedElements = `
                        <div class="flex items-center">
                            <p class="text-desaturatedDarkCyan font-bold mr-4 md:text-md">${company}</p>
                            <div class="flex font-bold text-white items-center">
                            ${isnew ? '<p class="bg-desaturatedDarkCyan uppercase rounded-full px-2 pt-1 text-sm mr-2">New!</p>' : ''}
                            ${featured ? '<p class="bg-veryDarkGrayishCyan uppercase rounded-full px-2 pt-1 text-sm" > Featured</p>' : ''}
                            </div >
                        </div >
                        <p class="text-veryDarkGrayishCyan font-bold md:text-xl">${position}</p>
                        <div class="flex gap-2 items-center">
                            <p class="text-darkGrayishCyan">${postedAt}</p>
                            <p class="text-darkGrayishCyan mb-3 text-2xl">.</p>
                            <p class="text-darkGrayishCyan">${contract}</p>
                            <p class="text-darkGrayishCyan mb-3 text-2xl">.</p>
                            <p class="text-darkGrayishCyan">${location}</p>
                        </div>
                                `;
            innerDivContent.innerHTML = nestedElements
            innerDiv.appendChild(innerDivContent)
            createElem.appendChild(innerDiv)
            // create hr element
            const hrElement = document.createElement('hr');
            hrElement.classList.add('h-[1px]', 'bg-darkGrayishCyan', 'border-none', 'w-11/12', 'md:hidden');
            // Create the third inner div element
            const thirdInnerDivElement = document.createElement('div');
            thirdInnerDivElement.classList.add('flex', 'flex-wrap', 'gap-3', 'pr-8', 'md:flex-nowrap', 'md:float-right');
            // Create the nested elements within the third inner div
            const nestedElements2 = `
                <p class="font-bold text-desaturatedDarkCyan bg-lightGreyishCyanBg px-2 pt-2 pb-1 rounded-md cursor-pointer">${role}</p>
                <p class="font-bold text-desaturatedDarkCyan bg-lightGreyishCyanBg px-2 pt-2 pb-1 rounded-md cursor-pointer">${level}</p>
                ${languages.map(lang => `<p class="font-bold text-desaturatedDarkCyan bg-lightGreyishCyanBg px-2 pt-2 pb-1 rounded-md cursor-pointer">${lang}</p>`).join('')}
                ${tools.map(lang => `<p class="font-bold text-desaturatedDarkCyan bg-lightGreyishCyanBg px-2 pt-2 pb-1 rounded-md cursor-pointer">${lang}</p>`).join('')}
            `;

            thirdInnerDivElement.innerHTML = nestedElements2;
            createElem.appendChild(hrElement);
            createElem.appendChild(thirdInnerDivElement);
            console.log(createElem)
            mainElement.appendChild(createElem)
        });
    })
    .catch(error => {
        console.error('Error fetching the JSON file:', error);
    });

