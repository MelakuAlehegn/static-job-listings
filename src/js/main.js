fetch('./js/data.json')
    .then(response => response.json())
    .then(data => {
        // sort the object so that featured are on the top
        data.sort((a, b) => {
            if (a.featured && !b.featured) {
                return -1;
            } else if (!a.featured && b.featured) {
                return 1;
            } else {
                return 0;
            }
        });
        const mainElement = document.getElementById('main');
        data.forEach(obj => {
            // destructure vars from obj

            const { id, company, logo, isnew, featured, position, role, level, postedAt, contract, location, languages, tools } = obj;
            // create root element for each card
            const createElem = document.createElement('div');
            createElem.setAttribute('id', id);
            createElem.className = 'bg-white pl-4 flex flex-col md:flex-row md:justify-between md:py-5 md:px-6 md:items-center gap-2 justify-between shadow-xl  container mx-auto rounded-md pb-3';
            // check if featured exists
            if (featured) {
                createElem.classList.add('border-l-4', 'border-l-desaturatedDarkCyan');
            }
            // create left aligned elements container
            const innerDiv = document.createElement('div');
            innerDiv.className = 'flex flex-col gap-2 md:mr-7 md:flex-row md:gap-4 md:items-center';
            // crate company profile img
            const profileImg = document.createElement('img');
            profileImg.className = 'w-12 -mt-6 md:mt-0 md:w-20';
            profileImg.src = logo;
            innerDiv.appendChild(profileImg);
            // create div for left text
            const innerDivContent = document.createElement('div');
            innerDivContent.className = 'flex flex-col items-start justify-start';

            const textTop = document.createElement('div');
            textTop.className = 'flex items-center'
            innerDivContent.appendChild(textTop)
            // company name
            const companyElement = document.createElement('p');
            companyElement.className = 'text-desaturatedDarkCyan font-bold mr-4 md:text-md';
            companyElement.textContent = company;

            const featuredElement = document.createElement('div');
            featuredElement.className = 'flex font-bold text-white items-center';

            if (isnew) {
                const newElement = document.createElement('p');
                newElement.className = 'bg-desaturatedDarkCyan uppercase rounded-full px-2 pt-1 text-sm mr-2';
                newElement.textContent = 'New!';
                featuredElement.appendChild(newElement);
            }

            if (featured) {
                const featuredElementp = document.createElement('p');
                featuredElementp.className = 'bg-veryDarkGrayishCyan uppercase rounded-full px-2 pt-1 text-sm';
                featuredElementp.textContent = 'Featured';
                featuredElement.appendChild(featuredElementp);
            }
            // create position element
            const positionElement = document.createElement('p');
            positionElement.className = 'text-veryDarkGrayishCyan font-bold md:text-xl cursor-pointer hover:text-desaturatedDarkCyan';
            positionElement.textContent = position;

            const locationElement = document.createElement('div');
            locationElement.className = 'flex gap-2 items-center';

            const postedAtElement = document.createElement('p');
            postedAtElement.className = 'text-darkGrayishCyan';
            postedAtElement.textContent = postedAt;

            const contractElement = document.createElement('p');
            contractElement.className = 'text-darkGrayishCyan';
            contractElement.textContent = contract;

            const locationTextElement = document.createElement('p');
            locationTextElement.className = 'text-darkGrayishCyan';
            locationTextElement.textContent = location;

            locationElement.appendChild(postedAtElement);
            locationElement.appendChild(document.createTextNode('.'));
            locationElement.appendChild(contractElement);
            locationElement.appendChild(document.createTextNode('.'));
            locationElement.appendChild(locationTextElement);

            textTop.appendChild(companyElement);
            textTop.appendChild(featuredElement);
            innerDivContent.appendChild(positionElement);
            innerDivContent.appendChild(locationElement);

            innerDiv.appendChild(innerDivContent);
            createElem.appendChild(innerDiv);

            const hrElement = document.createElement('hr');
            hrElement.className = 'h-[1px] bg-darkGrayishCyan border-none w-11/12 md:hidden';
            createElem.appendChild(hrElement);

            const thirdInnerDivElement = document.createElement('div');
            thirdInnerDivElement.className = 'flex flex-wrap gap-3 pr-8 md:flex-nowrap md:float-right';

            const roleElement = document.createElement('p');
            roleElement.className = 'font-bold text-desaturatedDarkCyan bg-lightGreyishCyanBg px-2 pt-2 pb-1 rounded-md cursor-pointer hover:text-white hover:bg-desaturatedDarkCyan clickedP';
            roleElement.textContent = role;

            const levelElement = document.createElement('p');
            levelElement.className = 'font-bold text-desaturatedDarkCyan bg-lightGreyishCyanBg px-2 pt-2 pb-1 rounded-md cursor-pointer hover:text-white hover:bg-desaturatedDarkCyan clickedP';
            levelElement.textContent = level;

            thirdInnerDivElement.appendChild(roleElement);
            thirdInnerDivElement.appendChild(levelElement);

            languages.forEach(lang => {
                const langElement = document.createElement('p');
                langElement.className = 'font-bold text-desaturatedDarkCyan bg-lightGreyishCyanBg px-2 pt-2 pb-1 rounded-md cursor-pointer hover:text-white hover:bg-desaturatedDarkCyan clickedP';
                langElement.textContent = lang;
                thirdInnerDivElement.appendChild(langElement);
            });

            tools.forEach(tool => {
                const toolElement = document.createElement('p');
                toolElement.className = 'font-bold text-desaturatedDarkCyan bg-lightGreyishCyanBg px-2 pt-2 pb-1 rounded-md cursor-pointer hover:text-white hover:bg-desaturatedDarkCyan clickedP';
                toolElement.textContent = tool;
                thirdInnerDivElement.appendChild(toolElement);
            });



            createElem.appendChild(thirdInnerDivElement);

            mainElement.appendChild(createElem);
        });
        const clickedP = document.querySelectorAll('.clickedP')
        const searchDiv = document.getElementById('search')
        console.log(clickedP)
        clickedP.forEach(p => {
            p.addEventListener('click', () => {
                const content = p.textContent

                const existingP = searchDiv.querySelector(`p[data-content="${content}"]`)
                if (!existingP) {
                    const newElement = document.createElement('p');
                    newElement.className = 'font-bold text-desaturatedDarkCyan bg-lightGreyishCyanBg px-2 pt-2 pb-1 rounded-md cursor-pointer hover:text-white hover:bg-desaturatedDarkCyan'
                    newElement.textContent = content
                    newElement.setAttribute('data-content', content);
                    searchDiv.insertBefore(newElement, searchDiv.children[1])
                }
            })
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });
