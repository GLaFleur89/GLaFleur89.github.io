## Website Performance Optimization portfolio project

### Index.html Optimisations
1.) Reduced image size and quality of pizzeria.jpg to the max size needed i.e actual size viewed.<br>
2.) Enabled compression<br>
3.) Replaced images with optimised images.
4.) Replaced google fonts with font loader to allow fonts script to load asynchronous. 

### Main.js Optimisations










#### UpdatePositions Optimisations
1.) Remove calculation for Maths.sin (only needed once) outside of the loop for updatePositions().
2.) Change items to get elements by class name instead of querying all.

#### DOMContentLoaded Optimisations
1.) Create new image with height 100px and width 77px.
2.) Remove style.height and style.width as image size changed and additional resizing not needed.
