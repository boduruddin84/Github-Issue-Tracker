
async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    displayIssues(data.data);

}

function displayIssues(issues) {
    issues.forEach(issue => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="card bg-base-100 w-fit shadow-sm">
          <div class="card-body space-y-3">
            <div class="text-right">
                <button class="btn rounded-full px-6 py-1.5">High</button>
            </div>
            <h3 class="text-[#1F2937] font-semibold text-[14px]">Fix navigation menu on mobile devices</h3>
            <p class="text-[12px] text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices...</p>
            <div class="flex gap-1">
                <button class="btn rounded-full bg-yellow-400">${issue.labels[0]}</button>
                <button class="btn rounded-full bg-yellow-400">help wanted</button>
            </div>
            <hr class="text-gray-300">
            <div>
                <p class="text-[#64748B]">#<span>1</span> by <span>john_doe</span></p>
            </div>
            <div>
                <p class="text-[#64748B]">1/15/2024</p>
            </div>
          </div>
        </div>
        `;
        issuesContainer.appendChild(card);
    })
}

loadIssues();


const issuesContainer = document.getElementById("Issues-container");
issuesContainer.innerHTML = "";


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
