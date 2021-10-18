let rows = 3;
let columns = 3;

class TableCreator {
    templateText = "Edit Header";
    currentRows = 0;
    currentColumns = 0;
    inputCellCount = 0;

    constructor(){
        // Create the basic table
        this.table = document.getElementById("table");
        this.table.innerHTML = "";
        this.body = document.createElement("tbody");
        this.table.appendChild(this.body);
    }

    /**
     * Create the table
     * @param {int} rows: The number of rows to create the table with
     * @param {int} columns: The number of columns to create the table with
     */
    createTable(rows, columns){
        this.currentRows = rows;
        this.currentColumns = columns;

        // Append a header row
        this.appendHeaderRow(columns);

        // Add the correct number of rows
        for (let x = 0; x < rows; x++){
            this.appendRow(columns);
        }
    }

    updateTableSize(rows, columns){
        // Continuously add / remove columns and rows until they are at the desired values
        while(rows != this.currentRows || columns != this.currentColumns){
            // If the number of rows have increased, add a row
            if (rows > this.currentRows){
                this.appendRow(this.currentColumns);
                this.currentRows += 1;
            }
            // If the number of rows have decreased, remove a row
            else if (rows < this.currentRows){
                this.removeLastRow();
                this.currentRows -= 1;
            }

            // If the number of columns have increased, add a column
            if (columns > this.currentColumns){
                this.appendColumn();
                this.currentColumns += 1;
            }
            // If the number of columns have decreased, remove a column
            else if (columns < this.currentColumns){
                this.removeLastColumn();
                this.currentColumns -= 1;
            }
        }
    }

    /**
     * Create the header row for the table
     * @param {int} columns: The number of columns to create the header with
     */
    appendHeaderRow(columns){
        // Create a row and add all of the header columns to it
        let row = document.createElement("tr");
        this.body.appendChild(row);

        row.appendChild(this.addHeaderCell(false));

        for (let i = 0; i < columns; i++){
            row.appendChild(this.addHeaderCell());
        }
    }

    /**
     * Create a row for the table
     * @param {int} columns: The number of columns to create the row with
     */
    appendRow(columns){
        // Create a row and add all of the header columns to it
        let row = document.createElement("tr");
        this.body.appendChild(row);

        // Add the header cell to the start of the row
        row.appendChild(this.addHeaderCell());

        // Add normal cells to every other column in the row
        for (let i = 0; i < columns; i++){
            row.appendChild(this.addNormalCell());
        }
    }

    /**
     * Remove the last row from the table
     */
    removeLastRow(){
        this.body.removeChild(this.body.childNodes[this.body.children.length - 1]);
    }

    /**
     * Append a column to the table
     */
    appendColumn() {
        // Add a header cell to the first row
        this.body.rows[0].appendChild(this.addHeaderCell());

        // Add normal cells to every other row
        for (let i = 1; i < this.body.rows.length; i++){
            this.body.rows[i].appendChild(this.addNormalCell());
        }
        
        // Update the column widths
        this.table.style.tableLayout = "auto";
        this.table.style.tableLayout = "fixed";
    }

    /**
     * Remove the last column from the table
     */
    removeLastColumn() {
        for (let i = 0; i < this.body.rows.length; i++){
            this.body.rows[i].removeChild(this.body.rows[i].children.item(this.body.rows[i].children.length - 1));
        }
        
        // Update the column widths
        this.table.style.tableLayout = "auto";
        this.table.style.tableLayout = "fixed";
    }

    /**
     * Logic for creating a header cell
     * @param {boolean} includeInput: Whether to include the input field or not (default: true)
     * @returns: The header cell
     */
    addHeaderCell(includeInput=true){
        let header = document.createElement("th");
        header.id = "headerCell" + this.inputCellCount;
        header.className = "tableCell tableHeader";

        if (includeInput){
            let input = document.createElement("input");
            input.className = "input";
            input.id = "inputCell" + this.inputCellCount;
            input.style.fontSize = "15px";
            input.addEventListener("blur", () => this.resizeInputFontSize(input, this.table));
            this.inputCellCount = this.inputCellCount + 1;
            input.placeholder = this.templateText;
            header.appendChild(input);
        }        

        return header;
    }

    /**
     * Logic for creating a normal table cell
     * @returns: The normal table cell to add
     */
    addNormalCell(){
        let cell = document.createElement("td");
        cell.className = "tableCell";

        return cell;
    }

    /**
     * Resize the fontsize for a given element
     * @param {Element} inputCell: The input cell to resize
     */
    resizeInputFontSize(inputCell, table){
        // Setup the invisible span to test the font size
        let measureWidthSpan = document.getElementById("measureWidthSpan");
        let fontSize = parseFloat(inputCell.style.fontSize);
        measureWidthSpan.style.fontSize = fontSize + "px";
        measureWidthSpan.innerText = inputCell.value;
    
        // Make the fontsize bigger if it needs to be
        while(measureWidthSpan.offsetWidth < inputCell.offsetWidth - 25 && fontSize < 15){
            fontSize += 0.1;
            measureWidthSpan.style.fontSize = fontSize + "px";
            measureWidthSpan.innerText = inputCell.value;
        }
    
        // Else make it smaller if it needs to be
        while(measureWidthSpan.offsetWidth > inputCell.offsetWidth - 25 && fontSize > 0){
            fontSize -= 0.1;
            measureWidthSpan.style.fontSize = fontSize + "px";
            measureWidthSpan.innerText = inputCell.value;
        }
    
        inputCell.style.fontSize = fontSize + "px";
    
        table.style.tableLayout = "auto";
        table.style.tableLayout = "fixed";
    }
}

let table = new TableCreator();
table.createTable(rows, columns);


document.getElementById("rowsInput").addEventListener("change", (event) => {
    rows = event.target.value;
    table.updateTableSize(rows, columns);
});

document.getElementById("columnsInput").addEventListener("change", (event) => {
    columns = event.target.value;
    table.updateTableSize(rows, columns);
});

