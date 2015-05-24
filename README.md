# Javascript Tree of life using SVG and HTML5

## Requirements

jquery

snapsvg.io

## How to use

### Clone the repo

```
git clone https://github.com/kassius/svg-treeoflife.git
```

### Include the scripts

1. Include the javascripts in the html, inside the `<head>` (not inside **your** head, but in the html you are creating):

 ```
 <script src="snap.svg-min.js"></script>
 <script src="jquery-2.1.4.min.js"></script>
 <script src="svg-treeoflife.js"></script>
 ```

### Create the element inside you DOM

2. Create a svg in your `<body>` (not in your etc) in your html:

 `<svg id="tree"></svg>`
 
3. Go back to your `<head>` and add the initializing script (we are setting 600px width here):

 ```
 <script>    
 $(document).ready(function(){
  var myTree = TreeOfLife(600,"#tree");
 });
 </script>
 ```

This is all, it should work.

## Styling the Tree

There are many CSS classes (.class) and html ids (#id) that you use to style your **svg** via CSS.

### TL; DR.

#### IDS

IDS                     | what i do
----------------------- | ---------------------------
#sphere[num]            | *num* from 1 to 11 (daath), ex.: `#sphere6`
#sphere[num]-toptext    | Text on top for a given sphere.
#sphere[num]-middletext | Text on top for a given sphere.
#sphere[num]-bottomtext | Text on top for a given sphere.
#path[num]              | *num* from 1 to 22, ex.: `#path2`. `<rect>` of each path.
#path[num]-text         | *num* from 1 to 22, ex.: `#path2` text of each path

#### Classes

CLASSES               | what they are
--------------------- | -------------
.sphere[num]-circs    |  *num* from 1 to 11 (daath). Sphere [num] `<circ>` element.     | 
.sphere[num]-elements | All elements of each sphere: circle and texts.
.sphere-toptext       | Text on top for all spheres alike.
.sphere-middletext    | Text on center for all spheres alike.
.sphere-bottom        | Text on bottom for all spheres alike.
.path-rects           | *num* from 1 to 22. Rectangle [num] `<rect>` element.
.path[num]-elements   | All elements of each path: rectangle and text.
.path-text            | Text only of all paths alike. 

#### CLASSES

### IDS and CSS Classes to stylize svg elements via CSS or JS

*sphere1* is Kether etc, *sphere11* is Daath.

#### I. Stylizing the Spheres

##### CLASSES: **.sphere1-circs**, **sphere2-circs**, etc to **.sphere11-circs**

These classes style the `<circ>` elements, the circle of each sphere.

##### CLASSES: **.sphere1-elements**, **sphere2-elements**, etc to **.sphere11-elements**

These classes style the `<circ>` and `<text>` elements of each sphere. If you use these classes for styling, you can style the circle and the text of each sphere.

##### ID: #sphere[num]-toptext

These ids (*[num]* from 1 to 11) stylize top text from each sphere.

##### CLASS: .sphere-toptext

This class stylize the top text of all the spheres alike.

##### ID: #sphere[num]-middletext

These ids (*[num]* from 1 to 11) stylize top text from each sphere.

##### CLASS: .sphere-middletext

This class stylize the top text of all the spheres alike.

##### ID: #sphere[num]-bottomtext

These ids (*[num]* from 1 to 11) stylize bottom text of each sphere.

##### CLASS: .sphere-bottomtext

This class stylize the top text of all the spheres alike.

##### CLASSES: **.sphere1-elements**, **sphere2-elements**, **sphere[num]-elements**, etc to **.sphere11-elements**

#### II. Stylizing the Paths

##### ID `#path1`, `#path2`, `#path[num]` to `#path22`

These are the IDS for each path `<rect>`.

##### CLASS: `.path-rects`

These classes style the `<rect>` elements, *ie.*, the rectangle of each path.

##### CLASSES: `.path1-elements`,`.path2-elements`, `.path[num]-elements` to `.path22-elements`

These classes style the `<rect>` and `<text>` elements of each path. If you use these classes for styling, you can style the rectangle and the text of each path.

##### CLASS: `.path-text`

This class stylize the text (svg `<text>` element) for all the paths alike.

### Tinkering with styles etc

As this script uses jQuery, you can tinker with the Tree Of Life style using your browsers code inspector (in Chrome, press CTRL + Shift + I) to open it.

## Extra documentation

svg