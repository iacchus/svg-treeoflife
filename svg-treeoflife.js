function getOpposite(radius, adj)
{
	tan = Math.tan(Snap.rad(radius));
	return (adj * tan);
}

// current y = line height-1 (first is zero) * line height + sphere radius (center of the sphere)  
function line(l, lh, sr)
{
	return ((l-1) * lh) + sr;
}

function TreeData(width,el,fontsize)
{
	this.width = width;
	center = this.center = width / 2;
	sphere_diameter = this.sphere_diameter = width * 0.234375;
	sphere_radius = this.sphere_radius = sphere_diameter/2;
	degrees = this.degrees = 30;
	frame_width = this.frame_width = width - sphere_diameter;
	frame_center = this.frame_center = frame_width/2;
	line_height = this.line_height = getOpposite(degrees,frame_center);
	path_height = this.path_height = frame_width * 0.0546875;

        height = this.height = line_height * 9 + 10; // sphere stroke *2

	middle_pillar = this.middle_pillar = center;
	left_pillar = this.left_pillar = sphere_radius;
	right_pillar = this.right_pillar = width - sphere_radius;

	this.el = el;

	//this.fontsize = fontsize;
	fontsize = this.fontsize = 0.02666*width;

	this.textpadding = fontsize/2;

	$(el).css({ fontSize : fontsize + "px" });
}

function SphereData()
{
	uid = this.uid = 0;

	this.nid = 0;

	this.type = "sphere";

	stroke = this.stroke = 'black';
	fill = this.fill = 'white';

	// text stroke and fill defs
	tstroke = this.tstroke = 'none';
	tfill = this.tfill = 'black';

	this.opacity = 1;

	this.text_top = {
		text : "TOP LABEL",
		stroke : this.tstroke,
		fill : this.tfill,
		opacity : this.opacity
	}

	this.text_middle = {
		text : "MIDDLE LABEL",
		stroke : this.tstroke,
		fill : this.tfill,
		opacity : this.opacity
	}

	this.text_bottom = {
		text : "BOTTOM LABEL",
		stroke : this.tstroke,
		fill : this.tfill,
		opacity : this.opacity
	}
}

function PathData()
{
	uid = this.uid = 1;
	
	this.type = "path";

	stroke = this.stroke = 'black';
	fill = this.fill = 'white';

	tstroke = this.tstroke = 'none';
	tfill = this.tfill = 'black';

	ttext = this.text = "PATH";

	this.opacity = 1;
}

// SPHERE
function Sphere(snap, pillar, sline, treedata)
{
	this.snap = snap;

	this.x = x = pillar;
	this.y = y = line(sline, treedata.line_height, treedata.sphere_radius);
	this.r = r = treedata.sphere_radius;

	this.data = new SphereData();

	this.draw = function ()
	{
		snap = this.snap;

		x = this.x;
		y = this.y;
		r = this.r;

		tpad = treedata.textpadding;
		rpad = r - tpad;

		// SPHERE - create group
		this.grp = snap.group()
			.attr({
				id:this.data.uid + "-group",
				opacity: this.data.opacity
			});
			//.hover(HoverOnSphere(this.data.uid),HoverOutSphere(this.data.uid));

		// SPHERE - draw circle
		this.sphere = snap.circle(x,y,r)
			.attr({
				id:this.data.uid,
				class:'sphere-circs ' + this.data.uid + '-elements',
				stroke : this.data.stroke,
				fill : this.data.fill
			})
			.appendTo(this.grp);
			

		// this drow a dot in the middle of each sphere
		//this.middot= snap.circle(x,y,1).attr({stroke:'black'});

		// SPHERE - top text
		this.tstr = this.data.text_top.text;
		this.tpath = snap.path("M" + x + "," + y + " m" + (-rpad) + ",0 a" + rpad + "," + rpad + " 0 0 1 " + (rpad*2) + ",0" )
			.attr({ fillOpacity:'0' })
			.appendTo(this.grp);
		this.ttext = snap.text(0, 0, this.tstr)
			.attr({
				id:this.data.uid+"-toptext",
				class:'sphere-toptext ' + this.data.uid + '-elements' + ' sphere-texts',
				textpath: this.tpath,
				textAnchor:'middle',
				stroke:this.data.text_top.stroke,
				fill:this.data.text_top.fill,
			})
			.appendTo(this.grp)
			.textPath.attr({
				startOffset: '50%',
				alignmentBaseline:'text-before-edge'
			});
		//	.appendTo(this.grp);

		// SPHERE - middle text
		this.mstr = this.data.text_middle.text;
		this.mtext = snap.text(x, y, this.mstr)
			.attr({
				id:this.data.uid+"-middletext",
				class:'sphere-middletext ' + this.data.uid + '-elements' + ' sphere-texts',
				textAnchor:'middle',
				alignmentBaseline:'middle',
				stroke:this.data.text_middle.stroke,
				fill:this.data.text_middle.fill,
			})
			.appendTo(this.grp);

		// SPHERE - bottom text
		this.bstr = this.data.text_bottom.text;
		this.bpath = snap.path("M" + x + "," + y + " m" + (-rpad) + ",0 a" + rpad + "," + rpad + " 0 0 0 " + (rpad*2) + ",0" )
			.attr({
				fillOpacity:'0'
			})
			.appendTo(this.grp);
		this.btext = snap.text(0, 0, this.bstr)
			.attr({
				id:this.data.uid+"-bottomtext",
				class:'sphere-bottomtext ' + this.data.uid + '-elements' + ' sphere-texts',
				textpath:this.bpath,
				textAnchor:'middle',
				stroke:this.data.text_bottom.stroke,
				fill:this.data.text_bottom.fill,
			})
			.appendTo(this.grp)
			.textPath.attr({
				startOffset: '50%',
				alignmentBaseline:'text-after-edge'
			});

	}

}

// PATH
function Path(snap,s1,s2,treedata)
{
	this.snap = snap;
	x1 = this.x1 = parseFloat(s1.x);
	y1 = this.y1 = parseFloat(s1.y);
	x2 = this.x2 = parseFloat(s2.x);
	y2 = this.y2 = parseFloat(s2.y);

	path_height = this.path_height = treedata.path_height;

	d = this.d = Math.sqrt(Math.pow(Math.abs(x2-x1),2) + Math.pow(Math.abs(y2-y1),2));
	dx = this.dx = ((x1 + x2) / 2) - d/2;
	dy = this.dy = ((y1 + y2) / 2) - path_height/2;

	deg = this.deg = ((x2 <= x1) ? -(Snap.deg(Math.asin((y2-y1)/d))) : +(Snap.deg(Math.asin((y2-y1)/d))) );	

	this.data = new PathData();

	// PATH - draw path
	this.draw = function ()
	{
		snap = this.snap;

		x1 = this.x1;
		x2 = this.x2;
		y1 = this.y1;
		y2 = this.y2;

		path_height = this.path_height;

		d = this.d;
		dx = this.dx;
		dy = this.dy;

		deg = this.deg;

		// PATH - group of elements
		
		this.grp = snap.group()
			.attr({
				id:this.data.uid + "-group",
				opacity: this.data.opacity
			});

		// PATH - element itself
		this.path = snap.rect(dx,dy,d,path_height)
			.attr({
				id:this.data.uid,
				class:'path-rects ' + this.data.uid + '-elements',
				fill:this.data.fill,
				stroke:this.data.stroke,
			})
			.transform("r"+deg)
			.appendTo(this.grp);

		// PATH - text
		this.tx = tx = ((x1 + x2) / 2);
		this.ty = ty = ((y1 + y2) / 2);
		this.text = text = snap.text(tx,ty,this.data.text)
		       .attr({ 
				id:this.data.uid+"-text",
				class:'path-text ' + this.data.uid + '-elements',
				textAnchor:'middle',
				alignmentBaseline:'middle',
				fill:this.data.tfill,
				stroke:this.data.tstroke,
			})
			.transform("r"+deg)
			.appendTo(this.grp);
	}
}

TreeOfLife = function(width, el)
{
	var fontsize = parseFloat($(el).css("font-size"));
		
	this.treedata = treedata = new TreeData(width,el,fontsize);

	$(el).width(treedata.width).height(treedata.height);
	
	var middle_pillar = treedata.center;
	var left_pillar = treedata.left_pillar;
	var right_pillar = treedata.right_pillar;

	var path_height = treedata.path_height;//exclude me!!

	var s = Snap(el).attr({
		viewBox: "0 0 " + Math.round(treedata.width) + " " + Math.round(treedata.height),
	        width: Math.round(treedata.width),
		height: Math.round(treedata.height)
	});

	this.sp = Array();
	this.sp[1] = new Sphere(s,center,1,treedata);
	this.sp[2] = new Sphere(s,right_pillar,2,treedata);
	this.sp[3] = new Sphere(s,left_pillar,2,treedata);
	this.sp[4] = new Sphere(s,right_pillar,4,treedata);
	this.sp[5] = new Sphere(s,left_pillar,4,treedata);
	this.sp[6] = new Sphere(s,middle_pillar,5,treedata);
	this.sp[7] = new Sphere(s,right_pillar,6,treedata);
	this.sp[8] = new Sphere(s,left_pillar,6,treedata);
	this.sp[9] = new Sphere(s,middle_pillar,7,treedata);
	this.sp[10] = new Sphere(s,middle_pillar,9,treedata);
	this.sp[11] = new Sphere(s,middle_pillar,3,treedata);

	this.pt = Array();
	this.pt[1] = new Path(s,this.sp[1],this.sp[2],treedata);
	this.pt[2] = new Path(s,this.sp[1],this.sp[3],treedata);
	this.pt[3] = new Path(s,this.sp[1],this.sp[6],treedata);
	this.pt[4] = new Path(s,this.sp[2],this.sp[3],treedata);
	this.pt[5] = new Path(s,this.sp[2],this.sp[6],treedata);
	this.pt[6] = new Path(s,this.sp[2],this.sp[4],treedata);
	this.pt[7] = new Path(s,this.sp[3],this.sp[6],treedata);
	this.pt[8] = new Path(s,this.sp[3],this.sp[5],treedata);
	this.pt[9] = new Path(s,this.sp[4],this.sp[5],treedata);
	this.pt[10] = new Path(s,this.sp[4],this.sp[6],treedata);
	this.pt[11] = new Path(s,this.sp[4],this.sp[7],treedata);
	this.pt[12] = new Path(s,this.sp[5],this.sp[6],treedata);
	this.pt[13] = new Path(s,this.sp[5],this.sp[8],treedata);
	this.pt[14] = new Path(s,this.sp[6],this.sp[7],treedata);
	this.pt[15] = new Path(s,this.sp[6],this.sp[8],treedata);
	this.pt[16] = new Path(s,this.sp[6],this.sp[9],treedata);
	this.pt[17] = new Path(s,this.sp[8],this.sp[7],treedata);
	this.pt[18] = new Path(s,this.sp[7],this.sp[9],treedata);
	this.pt[19] = new Path(s,this.sp[7],this.sp[10],treedata);
	this.pt[20] = new Path(s,this.sp[8],this.sp[9],treedata);
	this.pt[21] = new Path(s,this.sp[8],this.sp[10],treedata);
	this.pt[22] = new Path(s,this.sp[9],this.sp[10],treedata);

	this.sd = new Object();
	this.sd = {
		1: { tt: 'Kether - Corona', tm: '1', tb: 'The Crown' },
		2: { tt: 'Chokmah - Sapientia', tm: '2', tb: 'Wisdom' },
		3: { tt: 'Binah - Compherensio', tm: '3', tb: 'Understanding' },
		4: { tt: 'Chesed - Clementia', tm: '4', tb: 'Mercy' },
		5: { tt: 'Geburah - Virtus', tm: '5', tb: 'Strength' },
		6: { tt: 'Tiphareth - Pulchritudo', tm: '6', tb: 'Beauty' },
		7: { tt: 'Netzack - Victoria', tm: '7', tb: 'Victory' },
		8: { tt: 'Hod - Splendor', tm: '8', tb: 'Splendour' },
		9: { tt: 'Yesod - Fundamentum', tm: '9', tb: 'The Foundation' },
		10: { tt: 'Malkuth - Regnum', tm: '10', tb: 'The Kingdom' },
		11: { tt: 'Daath - Scientia', tm: '11', tb: 'Knowledge' },
	}

	this.pd = new Object();
	this.pd = {
		1: { text: '0 · The Fool' },
		2: { text: 'I · The Magus' },
		3: { text: 'II · The Priestess' },
		4: { text: 'III · The Empress' },
		5: { text: 'IV · The Emperor' },
		6: { text: 'V · The Hierofant' },
		7: { text: 'VI · The Lovers' },
		8: { text: 'VII · The Chariot' },
		9: { text: 'VIII · Adjustment' },
		10: { text: 'IX · The Hermit' },
		11: { text: 'X · Fortune' },
		12: { text: 'XI · Lust' },
		13: { text: 'XII · The Hanged Man' },
		14: { text: 'XIII · Death' },
		15: { text: 'XIV · Art' },
		16: { text: 'XV · The Devil' },
		17: { text: 'XVI · The Tower' },
		18: { text: 'XVII · The Star' },
		19: { text: 'XVIII · The Moon' },
		20: { text: 'XIX · The Sun' },
		21: { text: 'XX · The Aeon' },
		22: { text: 'XXI · The Universe' },
	}

	for(i=1;i<this.pt.length;i++) {

		this.pt[i].data.nid = i; //hardcore string later!!
		this.pt[i].data.uid = "path" + i; //hardcore string later!!
		this.pt[i].data.text = this.pd[i].text;

		this.pt[i].draw();
	}

	for(i=1;i<this.sp.length;i++) {
		this.sp[i].data.nid = i;
		this.sp[i].data.uid = "sphere" + i; //hardcore prefix later!!
		this.sp[i].data.text_top.text = this.sd[i].tt;
		this.sp[i].data.text_middle.text = this.sd[i].tm;
		this.sp[i].data.text_bottom.text = this.sd[i].tb;

		this.sp[i].draw();
	}

}


