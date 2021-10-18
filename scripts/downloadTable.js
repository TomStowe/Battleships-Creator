/**
 * Get the table and put it into a container
 */
const getTable = () => {
    // Get the table
    let table = document.getElementById("table").cloneNode(true);

    let inputs = Array.from(table.getElementsByClassName("input"));

    // Remove placeholder text
    for (let i = 0; i < inputs.length; i++){
        inputs[i].setAttribute("placeholder", "");
        inputs[i].style.fontSize = "10px";
    }

    // Create the hit and miss targets
    let p = document.createElement("p");
    p.style = "text-align: center;";
    let hit = document.createElement("span");
    hit.style = "margin-left: 10%; margin-right: 10%;";
    hit.innerHTML = document.getElementById("battleshipsHit").value;
    let title = hit.cloneNode(true);
    title.style = "font-weight: bold;";
    title.innerHTML = document.getElementById("battleshipsTitle").value;
    let miss = hit.cloneNode(true);
    miss.innerHTML = document.getElementById("battleshipsMiss").value;
    p.appendChild(title);
    p.appendChild(document.createElement("br"));
    p.appendChild(hit);
    p.appendChild(miss);

    // Create a container for the table
    let tableContainer = document.createElement("div");
    tableContainer.className = "pdfTableContainer"
    tableContainer.appendChild(p);
    tableContainer.appendChild(table);

    return tableContainer;
}


document.getElementById("downloadBoard").addEventListener("click", () => {
    let tableContainer = getTable();
    // Create the document outline
    let container = document.createElement("div");
    container.className = "pdfContainer";

    // Create the right number of tables
    for (let i = 0; i < document.getElementById("numberOfTables").value; i++){
        container.appendChild(tableContainer.cloneNode(true));
    }

    // Save the pdf
    html2pdf().set({pagebreak: {mode: "avoid-all"}, margin: 10}).from(container).save("battleships.pdf");
})