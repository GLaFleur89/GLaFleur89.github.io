## Website Performance Optimization portfolio project

### Index.html Optimisations
1.) Reduced image size and quality of pizzeria.jpg to the max size needed i.e actual size viewed.<br>
2.) Enabled compression<br>
3.) Replaced images with optimised images.
4.) Replaced google fonts with font loader to allow fonts script to load asynchronous. 

### Main.js Optimisations










#### UpdatePositions Optimisations
1.) Change items to get elements by class name instead of querying all.<br>
2.) Remove calculation for items.lemgth (only needed once) outside of the loop for updatePositions().<br>
3.) Remove calculation using scrollTop outside of loop. <br>
4.) Changed style.left to transform by translateX and translateZ(0).<br>
5.) UpdatePositions no longer runs on scroll but requestAnimationFrame now runs with each scroll with UpdatePositions as the functions input.

#### DOMContentLoaded Optimisations
1.) Create new image with height 100px and width 77px.<br>
2.) Remove style.height and style.width as image size changed and additional resizing not needed.<br>
3.) changed no. of pizzas to 50.

