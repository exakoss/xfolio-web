import React, { Component } from 'react';
import p5 from 'p5';

// class Banner extends Component {
//     constructor(props) {
//         super(props);
//         this.sketchRef = React.createRef();
//     }

//     Sketch = (p5) => {
//         let size = 50;
//         p5.setup = () => {
//             if (p5.windowWidth > p5.windowHeight) {
//                 p5.createCanvas(p5.windowWidth,(p5.windowWidth/2/7)*3);
//                 size = p5.width/2/7;
//             }
//             else {
//                 p5.createCanvas(p5.windowWidth,(p5.windowWidth/7)*3);
//                 size = p5.width/7;
//             }
//             p5.createSketch();
//         }

//         p5.createSketch = () => {
//             p5.clear();
//             p5.strokeWeight(5);
//             p5.stroke(20);
//             p5.fill(240);
//             for (let i=0;i < p5.width/size;i++) {
//                 for (let j=0;j < p5.height/size;j++) {
//                 let rand = p5.random([1,2,3,4]);
//                 if (rand === 2) {
//                     rand = p5.random([1,2,3,4]);
//                     if (rand === 4) {
//                         p5.rect((i*size),(j*size),size,size);
//                     }
//                     else {
//                         p5.ellipse((i*size)+(size/2),(j*size)+(size/2),size,size);
//                     }
//                 }
//                 }
//             }
//         }

//         p5.mousePressed = () => {
//             p5.createSketch();
//         }

//         p5.windowResized = () => {
//             if (p5.windowWidth > p5.windowHeight) {
//                 p5.resizeCanvas(p5.windowWidth/2,(p5.windowWidth/2/7)*3);
//             }
//             else {
//                 p5.resizeCanvas(p5.windowWidth,(p5.windowWidth/7)*2);
//             }
//             p5.createSketch();
//         }
//     }

//     componentDidMount() {
//         this.sketch = new p5(this.Sketch, this.sketchRef.current);
//     }

//     render() {
//         return(
//             <div className='sketch' ref={this.sketchRef}>
//             </div>
//         )
//     }
// }

// export default Banner;