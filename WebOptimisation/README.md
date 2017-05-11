## Website Performance Optimization portfolio project

### Running Instructions
Open Index.html in browser. or use the address bar in your browser to go to SilverAceLegend.github.io.

### Index.html Optimisations
1.) Reduced image size and quality of pizzeria.jpg to the max size needed i.e actual size viewed.<br>
2.) Enabled compression<br>
3.) Replaced images with optimised images.<br>
4.) Replaced google fonts with font loader to allow fonts script to load asynchronous.

NB! Pagescore for mobile now 96/100 and desktop 94/100. Used web address: SilverAceLegend.github.io.

### Main.js Optimisations
#### Pizza Slider Optimisations
1.) Removed pizza length outside ChangePizzaSizes functions loop and changed querySelector to getElement. <br>
2.) As all pizzas are the same size can remove DX outside loop and use first element and changed querySelector to getElement. <br>
3.) Removed new width outside loop as only need to calculate new width for one element and changed querySelector to getElement. <br>
4.) Changed querySelector to getElement in loop. New width apllied to all elements in loop.

#### UpdatePositions Optimisations
1.) Change items to get elements by class name instead of querying all.<br>
2.) Remove calculation for items.length (only needed once) outside of the loop for updatePositions().<br>
3.) Remove calculation using scrollTop outside of loop. <br>
4.) Changed style.left to transform by translateX.<br>
5.) UpdatePositions no longer runs on scroll but requestAnimationFrame now runs with each scroll with UpdatePositions as the functions input.<br>
6.) Phase removed from loop due to same 5 numbers being calculated and given own loop to determine five numbers.

#### DOMContentLoaded Optimisations
1.) Create new image with height 100px and width 77px.<br>
2.) Remove style.height and style.width as image size changed and additional resizing not needed.<br>
3.) changed no. of pizzas to 35.
4.) removed basic.left and created style.left to align left as not in update positions anymore.
