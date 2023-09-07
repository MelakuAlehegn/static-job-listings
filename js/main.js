let jobsData = null
renderJobs()
hundleSearch()
function getJobs() {
    return axios.get("http://localhost:8000/api/jobs")
        .then(response => {
            jobsData = response.data;
            return jobsData;
        })
        .catch((error) => {
            console.error("Error fetching job data:", error);
        });
}
function renderJobs() {
    if (jobsData === null) {
        getJobs()
            .then(() => renderJobs());
        return;
    }
    const sortedJobs = sortJobsData(jobsData);
    const mainElement = document.getElementById('main');
    mainElement.innerHTML = ''
    sortedJobs.forEach(job => {
        const createdCard = createJobCard(job)
        mainElement.appendChild(createdCard)
    })
}
function sortJobsData(data) {
    return data.sort((a, b) => {
        if (a.featured && !b.featured) {
            return -1;
        } else if (!a.featured && b.featured) {
            return 1;
        } else {
            return 0;
        }
    });
}
function filterJobs(clickedtags) {
    if (jobsData === null) {
        getJobs()
            .then(() => filterJobs(clickedtags));
        return;
    }
    const sortedJobs = sortJobsData(jobsData);
    const filtered = sortedJobs.filter((job) => {
        const tags = mergeTags(job)
        return clickedtags.every((tag) => tags.includes(tag))
    })
    const mainElement = document.getElementById('main');
    mainElement.innerHTML = ""
    filtered.forEach(job => {
        const card = createJobCard(job)
        mainElement.appendChild(card)
    })
}
function mergeTags(job) {
    const allTagsArr = []
    allTagsArr.push(job.role)
    allTagsArr.push(job.level)
    allTagsArr.push(...job.languages)
    allTagsArr.push(...job.tools)
    return allTagsArr
}
function hundleSearch() {
    const mainElement = document.getElementById('main');
    const clickedTags = []
    mainElement.addEventListener('click', (event) => {
        if (event.target.matches('#main .clickedP')) {
            const clickedTag = event.target.textContent
            if (!clickedTags.includes(clickedTag)) {
                clickedTags.push(clickedTag)
                const searchDiv = document.getElementById('search')
                const tagsDiv = document.getElementById('tagsDiv')
                searchDiv.classList.remove('hidden')
                searchDiv.classList.add('flex')
                mainElement.classList.remove('mt-14')
                const containerElement = document.createElement('div');
                containerElement.className = 'flex items-center';
                const newElement = document.createElement('p');
                newElement.className = 'font-bold text-desaturatedDarkCyan bg-lightGreyishCyanBg px-2 pt-2 pb-1 rounded-l-md cursor-pointer'
                newElement.textContent = event.target.textContent
                const removeElement = document.createElement('span');
                removeElement.textContent = 'X';
                removeElement.className = 'font-bold text-white ml-0 cursor-pointer rounded-r-lg bg-desaturatedDarkCyan hover:bg-black px-3 pt-2 pb-1 removebtn';
                containerElement.appendChild(newElement);
                containerElement.appendChild(removeElement);
                tagsDiv.appendChild(containerElement)
                filterJobs(clickedTags);
            }
        }
    })
    const tagsDiv = document.getElementById('tagsDiv')
    const searchDiv = document.getElementById('search')
    tagsDiv.addEventListener('click', (event) => {
        if (event.target.matches('#search .removebtn')) {
            const removedTag = event.target.previousSibling.textContent.trim();
            event.target.parentElement.remove()
            const index = clickedTags.indexOf(removedTag);
            if (index !== -1) {
                clickedTags.splice(index, 1);
            }
            if (clickedTags.length === 0) {
                const searchDiv = document.getElementById('search')
                searchDiv.classList.remove('flex');
                searchDiv.classList.add('hidden')
                mainElement.classList.add('mt-14')
                renderJobs()
            }
            else {
                filterJobs(clickedTags);
            }
        }
    })
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', () => {
        tagsDiv.innerHTML = ""
        mainElement.innerHTML = ""
        searchDiv.classList.remove('flex')
        searchDiv.classList.add('hidden')
        mainElement.classList.add('mt-14')
        clickedTags.length = 0
        renderJobs()
    });
}

function createJobCard(job) {
    const { id, company, logo, isnew, featured, position, role, level, postedAt, contract, location, languages, tools } = job;
    const createElem = document.createElement('div');
    createElem.setAttribute('id', id);
    createElem.className = 'bg-white pl-4 flex flex-col md:flex-row md:justify-between md:py-7 md:px-6 md:items-center gap-2 justify-between shadow-xl  container mx-auto rounded-md pb-3';
    if (featured) {
        createElem.classList.add('border-l-[5px]', 'border-l-desaturatedDarkCyan');
    }
    const innerDiv = document.createElement('div');
    innerDiv.className = 'flex flex-col gap-2 md:mr-7 md:flex-row md:gap-4 md:items-center';
    const profileImg = document.createElement('img');
    profileImg.className = 'w-12 rounded-full -mt-6 md:mt-0 md:w-20';
    profileImg.src = logo;
    console.log(logo)
    innerDiv.appendChild(profileImg);
    // create div for left text
    const innerDivContent = document.createElement('div');
    innerDivContent.className = 'flex flex-col items-start justify-start gap-2';
    const textTop = document.createElement('div');
    textTop.className = 'flex items-center'
    innerDivContent.appendChild(textTop)
    // company name
    const companyElement = document.createElement('p');
    companyElement.className = 'text-desaturatedDarkCyan font-bold mr-4 md:text-lg';
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
    positionElement.className = 'text-veryDarkGrayishCyan font-bold md:text-2xl cursor-pointer hover:text-desaturatedDarkCyan';
    positionElement.textContent = position;

    const locationElement = document.createElement('div');
    locationElement.className = 'flex gap-2 items-center';

    const postedAtElement = document.createElement('li');
    postedAtElement.className = 'text-darkGrayishCyan md:text-xl list-none';
    const modifiedDate = moment(postedAt).fromNow()
    postedAtElement.textContent = modifiedDate;

    const contractElement = document.createElement('li');
    contractElement.className = 'text-darkGrayishCyan md:text-xl';
    contractElement.textContent = contract;

    const locationTextElement = document.createElement('li');
    locationTextElement.className = 'text-darkGrayishCyan md:text-xl';
    locationTextElement.textContent = location;
    locationElement.appendChild(postedAtElement);
    locationElement.appendChild(contractElement);
    locationElement.appendChild(locationTextElement);
    textTop.appendChild(companyElement);
    textTop.appendChild(featuredElement);
    innerDivContent.appendChild(positionElement);
    innerDivContent.appendChild(locationElement);

    innerDiv.appendChild(innerDivContent);
    createElem.appendChild(innerDiv);
    const hrElement = document.createElement('hr');
    hrElement.className = 'h-[1px] bg-darkGrayishCyan my-2 border-none w-5/6 md:hidden';
    createElem.appendChild(hrElement);

    const thirdInnerDivElement = document.createElement('div');
    thirdInnerDivElement.className = 'flex flex-wrap gap-3 pr-8 mb-4 md:flex-nowrap md:float-right';

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
    createElem.classList.add('card')
    return createElem
}
