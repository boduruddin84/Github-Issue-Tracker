const issuesCount = document.getElementById('issues-count');

async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    displayIssues(data.data);

}



function displayIssues(issues) {
    const issuesContainer = document.getElementById("Issues-container");
    issuesContainer.innerHTML = "";
    
    issues.forEach(issue => {
        const card = document.createElement("div");

        // div.className = "issue-card";

        // if(issue.status === "open"){
        //     div.style.borderTop = "5px solid green";
        // }else{
        //     div.style.borderTop = "5px solid purple";
        // }

        card.innerHTML = `
        <div class="card bg-base-100 w-fit h-fit shadow-sm">
          <div class="card-body space-y-3">
            <div class="text-right">
                <button class="btn rounded-full px-6 py-1.5">${issue.priority}</button>
            </div>
            <h3 class="text-[#1F2937] font-semibold text-[14px]">${issue.title}</h3>
            <p class="text-[12px] text-[#64748B]">${issue.description}</p>
            <div class="flex gap-1">
                <button class="btn rounded-full bg-yellow-400">${issue.labels[0]}</button>
                <button class="btn rounded-full bg-yellow-400">help wanted</button>
            </div>
            <hr class="text-gray-300">
            <div>
                <p class="text-[#64748B]">#<span>${issue.id}</span> by <span>${issue.author}</span></p>
            </div>
            <div>
                <p class="text-[#64748B]">${issue.createdAt}</p>
            </div>
          </div>
        </div>
        `;
        issuesContainer.appendChild(card);
    })

    issuesCount.innerText = issues.length;
}



async function openIssues(){

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

const data = await res.json();

const openData = data.data.filter((issue) => issue.status === "open");


displayIssues(openData);

}


async function closedIssues(){

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
const data = await res.json();
const closeData = data.data.filter((issue) => issue.status === "closed");

displayIssues(closeData);
}


// async function searchIssues(){

// const text = getInput('search-issues');

// const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);

// const data = await res.json();

// displayIssues(data.data);

// }





//       "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
