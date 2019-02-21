/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const height = 800;
const width = 1000;

const svg = document.querySelector('#svg');
svg.setAttribute('height', height);
svg.setAttribute('width', width);

const svgDoc = svg.contentDocument;

const svgns = "http://www.w3.org/2000/svg";

let selected = null;

class Drawer {
    drawEdge = function (id, x1, y1, x2, y2, color = 'black') {
        let newLine = document.createElementNS(svgns, 'line');
        
        if (!id) {
            id = "edge-" + Math.round(Math.random() * 1000);
        }

        newLine.setAttribute('id', id);
        
        newLine.setAttribute('x1', x1);
        newLine.setAttribute('y1', y1);
        newLine.setAttribute('x2', x2);
        newLine.setAttribute('y2', y2);
        
        newLine.setAttribute("stroke", color);
        newLine.setAttribute("stroke-width", "2px");
        newLine.setAttribute("fill", color);
        

        svg.append(newLine);
    }
    
    drawNode = function (node) {
        let circle = document.createElementNS(svgns, 'circle');
        
        if (!node.id) {
            node.id = "node-" + Math.round(Math.random() * 1000);
        }
        
        console.log("drawNode.", node);
        
        
//        circle.setAttribute('id', node.id);
        circle.setAttributeNS(null, 'id', node.id);
        
        circle.setAttributeNS(null, 'cx', node.x);
        circle.setAttributeNS(null, 'cy', node.y);
        circle.setAttributeNS(null, 'height', node.height || 50);
        circle.setAttributeNS(null, 'width', node.width || 50);
        circle.setAttributeNS(null, 'r', node.r || 10 );
        
        circle.setAttribute("stroke", node.color || 'red');
        circle.setAttribute("stroke-width", "6px");
        circle.setAttribute("fill", node.color || 'red');

        svg.appendChild(circle);
    }
    
    drawGraph = function (graph) {
        let self = this;
        
        graph.nodes.forEach(function(item, i, arr) {
            self.drawNode(item);
        });
        
        graph.edges.forEach(function(item, i, arr) {
            console.log("item", item);
            
            let from = document.getElementById(item.from);
            let to = document.getElementById(item.to);
            
            console.log("from", from);
            console.log("to", to);
            
            self.drawEdge(item.id, from.getAttribute('cx'), from.getAttribute('cy'), to.getAttribute('cx'), to.getAttribute('cy'), item.color);
        });
    }
}

class Graph {
//    constructor() {};
    
    nodes = [
        {id: "node-1", x: 100, y: 100, r: 10, height: 50, width: 50, color: 'red'},
        {id: "node-2", x: 300, y: 300, r: 10, height: 50, width: 50, color: 'red'}
    ];
    
    edges = [
        {id: "edge-1", from: "node-1", to: "node-2", direct: true, color: 'blue'}
    ];
}

let graph = new Graph();
let drawer = new Drawer();

//drawer.drawEdge(0, 0, 100, 100);
//drawer.drawNode(100, 100);
//drawer.drawNode(300, 300);

drawer.drawGraph(graph);

document.addEventListener("click", onSelect, false);
document.querySelector('#delete').addEventListener('click', deleteItem);
document.querySelector('#create-node').addEventListener('click', createNode);

function onSelect(e) {
  if (e.target !== e.currentTarget) {
    let clickedItemId = e.target.id;
    
    if (clickedItemId.includes('node-') || clickedItemId.includes('edge-') ) {
        let element = document.getElementById(clickedItemId);
        
        if (element && element !== selected) {
            if (selected) selected.setAttribute("stroke", "red");
            
            selected = element;
            selected.setAttribute("stroke", "black");
        } 
    } else if (selected) {
        selected.setAttribute("stroke", "red");
        selected = null;
    }
  }
  e.stopPropagation();
}



function deleteItem() {
    if (selected) {
        selected.remove();
    }
}

function createNode() {
    let node = {
        x: Math.random() * (width - 0) + 0, 
        y: Math.random() * (height - 0) + 0
    };
    
    drawer.drawNode(node);
}