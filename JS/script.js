const issuesCount = document.getElementById("issues-count");
const loadingSpinner = document.getElementById("loading-spinner");
const allButton = document.getElementById("all-btn");
const openButton = document.getElementById("open-btn");
const closedButton = document.getElementById("closed-btn");

async function loadIssues() {
  const issuesContainer = document.getElementById("Issues-container");
  issuesContainer.classList.add("hidden");
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();

  loadingSpinner.classList.add("hidden");
  issuesContainer.classList.remove("hidden");

  displayIssues(data.data);
}

function displayIssues(issues) {
  const issuesContainer = document.getElementById("Issues-container");
  issuesContainer.innerHTML = "";
  issues.forEach((issue) => {

    const labels = issue.labels
      .map(
        (label) =>
          `<button class="text-[12px] px-2 label btn rounded-full bg-yellow-400">${label}</button>`,
      )
      .join("");

    const card = document.createElement("div");

    card.innerHTML = `
        <div class="card bg-base-100 w-fit h-fit shadow-sm">
          <div onclick="openModal(${issue.id})" class="card-body space-y-3 cursor-pointer">
            <div class="text-right">
                <button class="btn rounded-full px-6 py-1.5">${issue.priority}</button>
            </div>
            <h3 class="text-[#1F2937] font-semibold text-[14px]">${issue.title}</h3>
            <p class="text-[12px] text-[#64748B]">${issue.description}</p>
            <div class="flex gap-1 ">
                ${labels}
            </div>
            <hr class="text-gray-300">
            <div>
                <p class="text-[#64748B]">#<span>${issue.id}</span> by <span>${issue.author}</span></p>
            </div>
            <div>
                <p class="text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        `;
    issuesContainer.appendChild(card);
  });

  issuesCount.innerText = issues.length;
}

async function openIssues() {
  const issuesContainer = document.getElementById("Issues-container");
  issuesContainer.classList.add("hidden");
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();

  loadingSpinner.classList.add("hidden");
  issuesContainer.classList.remove("hidden");

  const openData = data.data.filter((issue) => issue.status === "open");

  displayIssues(openData);
}

async function closedIssues() {
  const issuesContainer = document.getElementById("Issues-container");
  issuesContainer.classList.add("hidden");
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();

  loadingSpinner.classList.add("hidden");
  issuesContainer.classList.remove("hidden");
  const closeData = data.data.filter((issue) => issue.status === "closed");

  displayIssues(closeData);
}

function toggleStyle(id) {
  allButton.classList.remove("btn-primary");
  openButton.classList.remove("btn-primary");
  closedButton.classList.remove("btn-primary");

  allButton.classList.add("btn-outline");
  openButton.classList.add("btn-outline");
  closedButton.classList.add("btn-outline");

  const selected = document.getElementById(id);

  selected.classList.remove("btn-outline");
  selected.classList.add("btn-primary");
}

allButton.addEventListener("click", function () {
  loadIssues();
});
openButton.addEventListener("click", function () {
  openIssues();
});
closedButton.addEventListener("click", function () {
  closedIssues();
});

async function openModal(id) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  const issue = data.data;

  const labels = issue.labels
      .map(
        (label) =>
          `<button class="text-[12px] px-2 label btn rounded-full bg-yellow-400">${label}</button>`,
      )
      .join("");

  const issueModal = document.getElementById("issues_details_modal");

  issueModal.innerHTML = `
        <div class="modal-box">
        <div class="space-y-6">
            <h2 class="font-bold text-2xl text-[#1F2937]">
              ${issue.title}
            </h2>
            <div class="flex items-center gap-2">
              <button
                class="btn rounded-full text-[12px] font-medium text-[#64748B]"
              >
                ${issue.status}
              </button>
              <p class="text-[12px] text-[#64748B]">
                <span>${issue.status}</span> by <span>${issue.author}</span>
              </p>
              <p class="text-[12px] text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="flex gap-1">
                ${labels}
            </div>
            <p class="text-[#64748B]">
              ${issue.description}
              Need to fix the responsive behavior.
            </p>
            <div class="flex gap-20">
              <div>
                <p>Assignee:</p>
                <h3 class="text-[#1F2937] font-semibold">${issue.assignee}</h3>
              </div>
              <div>
                <p>Priority:</p>
                <button class="btn rounded-full">${issue.priority}</button>
              </div>
              <div></div>
            </div>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>

`;

  issueModal.showModal();
}

loadIssues();

