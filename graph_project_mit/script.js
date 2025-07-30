let nodes = [];
let edges = [];
let network = null;

document.getElementById("toggle-theme").onclick = () => {
    document.body.classList.toggle("dark");
};

document.getElementById("generate-table").onclick = () => {
    const count = parseInt(document.getElementById("vertex-count").value);
    const tableDiv = document.getElementById("adjacency-table");
    let html = "<table><tr><th></th>";
    for (let i = 1; i <= count; i++) html += `<th>${i}</th>`;
    html += "</tr>";

    for (let i = 1; i <= count; i++) {
        html += `<tr><th>${i}</th>`;
        for (let j = 1; j <= count; j++) {
            html += `<td><input type="number" min="0" max="99" value="0" style="width:40px"></td>`;
        }
        html += "</tr>";
    }
    html += "</table>";
    tableDiv.innerHTML = html;
};

document.getElementById("build-graph").onclick = () => {
    const directed = document.getElementById("directed").checked;
    const table = document.querySelectorAll("#adjacency-table table tr");
    nodes = [];
    edges = [];

    const size = table.length - 1;
    for (let i = 1; i <= size; i++) {
        nodes.push({ id: i, label: String(i) });
    }

    for (let i = 1; i <= size; i++) {
        const row = table[i].querySelectorAll("input");
        for (let j = 0; j < size; j++) {
            const weight = parseInt(row[j].value);
            if (weight > 0) {
                edges.push({ from: i, to: j + 1, label: String(weight), arrows: directed ? "to" : "" });
            }
        }
    }

    const container = document.getElementById("graph-container");
    const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
    const options = {
        physics: false,
        edges: { smooth: true },
        interaction: { dragNodes: true }
    };
    network = new vis.Network(container, data, options);
};
