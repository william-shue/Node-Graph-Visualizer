var gData =
{
  'nodes': [
    { 'id': '0' , 'group': '0' },
    { 'id': '1' , 'group': '0' },
    { 'id': '2' , 'group': '0' },
    { 'id': '3' , 'group': '0' },
    { 'id': '4' , 'group': '0' },
    { 'id': '5' , 'group': '0' },
    { 'id': '6' , 'group': '0' },
    { 'id': '7' , 'group': '0' },
    { 'id': '8' , 'group': '0' },
    { 'id': '9' , 'group': '0' },
    { 'id': '10', 'group': '0' },
    { 'id': '11', 'group': '0' },
    { 'id': '12', 'group': '0' }
  ],
  'links': [
    { 'source': '0' , 'target': '1' , 'value': '1', 'group': '0' },
    { 'source': '1' , 'target': '8' , 'value': '1', 'group': '0' },
    { 'source': '0' , 'target': '9' , 'value': '1', 'group': '0' },
    { 'source': '9' , 'target': '8' , 'value': '1', 'group': '0' },
    { 'source': '8' , 'target': '7' , 'value': '1', 'group': '0' },
    { 'source': '10', 'target': '7' , 'value': '1', 'group': '0' },
    { 'source': '10', 'target': '11', 'value': '1', 'group': '0' },
    { 'source': '11', 'target': '7' , 'value': '1', 'group': '0' },
    { 'source': '7' , 'target': '3' , 'value': '1', 'group': '0' },
    { 'source': '7' , 'target': '6' , 'value': '1', 'group': '0' },
    { 'source': '6' , 'target': '5' , 'value': '1', 'group': '0' },
    { 'source': '5' , 'target': '3' , 'value': '1', 'group': '0' },
    { 'source': '3' , 'target': '2' , 'value': '1', 'group': '0' },
    { 'source': '3' , 'target': '4' , 'value': '1', 'group': '0' }
  ]
};


function linkColor(link) {
  if (link.group == 0) {
    return '#1F85DE'
  } else if (link.group == 1) {
    return '#DAFF58'
  } else {
    return '#FF7858'
  }
}

var Graph = ForceGraph3D()
  (document.getElementById('3d-graph'))
  .graphData(gData)
  //.nodeAutoColorBy('group')
  .linkWidth(.75)
  .linkOpacity(.75)
  .nodeOpacity(10)
  .linkColor(link => linkColor(link))
  .enableNodeDrag(false)
  .nodeThreeObject(node => drawNodes(node));
Graph.numDimensions(2);

function colorize(node) {
  if (node.group == 0) {
    return '#1F85DE'
  } else if (node.group == 1) {
    return '#DAFF58'
  } else {
    return '#FF7858'
  }
}

function drawNodes(node) {
  // use a sphere as a drag handle
  const obj = new THREE.Mesh(
    new THREE.SphereGeometry(10),
    new THREE.MeshBasicMaterial({ depthWrite: false, transparent: false, opacity: 1, color: colorize(node) })
  );
  // add text sprite as child
  const sprite = new SpriteText(node.id);
  sprite.color = 'black';
  sprite.textHeight = 8;
  obj.add(sprite);
  return obj;
}


var order =
   [
    {link: 2,  node: 0,  color: 2},
    {link: 3,  node: 9,  color: 2},
    {link: 1,  node: 8,  color: 2},
    {link: 0,  node: 1,  color: 2},
    {link: 0,  node: 0,  color: 1},
    {link: 1,  node: 1,  color: 1},
    {link: 1,  node: 8,  color: 1},
    {link: 4,  node: 7,  color: 2},
    {link: 8,  node: 7,  color: 2},
    {link: 11, node: 3,  color: 2},
    {link: 10, node: 5,  color: 2},
    {link: 9,  node: 6,  color: 2},
    {link: 9,  node: 6,  color: 1},
    {link: 10, node: 6,  color: 1},
    {link: 11, node: 5,  color: 1},
    {link: 12, node: 2,  color: 2},
    {link: 12, node: 2,  color: 1},
    {link: 13, node: 4,  color: 2},
    {link: 13, node: 4,  color: 1},
    {link: 8,  node: 3,  color: 1},
    {link: 5,  node: 10, color: 2},
    {link: 6,  node: 10, color: 2},
    {link: 7,  node: 11, color: 2},
    {link: 7,  node: 7,  color: 1},
    {link: 6,  node: 11, color: 1},
    {link: 5,  node: 10, color: 1},
    {link: 4,  node: 7,  color: 1},
    {link: 3,  node: 8,  color: 1},
    {link: 2,  node: 9,  color: 1},
    {link: 0,  node: 0,  color: 1}]


//handles button functionality
document.getElementById("Show Path").onclick = function () {
  (function animate(sequence, i) {
    setTimeout(function () {
      nodeIdx = sequence[i].node
      linkIdx = sequence[i].link
      color = sequence[i].color

      gData.nodes[nodeIdx].group = color
      gData.links[linkIdx].group = color
      Graph
        .nodeThreeObject(Graph.nodeThreeObject())
        .linkColor(Graph.linkColor());
      if (i >= 0) { //if we haven't exhausted i
        i--;
        animate(sequence, i); //call animate again
      }
    }, 1000);
  })(sequence = order, i = 28);
};
