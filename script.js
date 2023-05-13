const statusList = document.getElementById("status");

let idleStart = null;
let timeout;

function resetTimer() {
    clearTimeout(timeout);
    if (!idleStart)
        idleStart = new Date();

    timeout = setTimeout(() => {
        
        const idleTime = (new Date() - idleStart) / 1000;
        if (idleTime > 10) {
            const entry = document.createElement("li");
            entry.textContent = `자리비움 시작시간: ${idleStart.getHours()}:${idleStart.getMinutes()}:${idleStart.getSeconds()}`;
            statusList.appendChild(entry);

            forgetIdle();
            longIdle();
        }
    }, 10000);
}

function forgetIdle() {
    idleStart = null;
    clearTimeout(timeout);
}

function longIdle() {
    timeout = setTimeout(() => {
        const entry = document.createElement("li");
        entry.textContent = `장기자리비움: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
        statusList.appendChild(entry);
        askReasonForIdle();
    }, 180000);
}

function askReasonForIdle() {
    const reasons = ["회의", "담배", "노가리", "잔심부름"];
    const reason = prompt("자리비움 사유입력\n" + reasons.join(", "));
    if (reasons.includes(reason)) {
        const entry = document.createElement("li");
        entry.textContent = `사유: ${reason}`;
        statusList.appendChild(entry);
    } else {
        alert("올바른 사유를 선택해주세요.");
        askReasonForIdle();
    }
}

document.addEventListener("mousemove", resetTimer);
document.addEventListener("keydown", resetTimer);

resetTimer();
