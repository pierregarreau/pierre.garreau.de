---
title: "On culture, and working remote at Searoutes."
date: 2020-04-22T19:40:58+02:00
draft: false
isProcessing: false
description: ""
tags: [ "Start-ups", "Tech" ]
---
<style>
.links {
  stroke: #000;
  stroke-opacity: 0.2;
}
.polygons {
  fill: none;
  stroke: #000;
}
.polygons :first-child {
  fill: #f00;
}
.sites {
  fill: #000;
  stroke: #fff;
}
.sites :first-child {
  fill: #fff;
}
.voronoi-holder {
  justify-content: center;
}
.img-center {
  width:60%%;
}
.column {
  float: left;
  width: 50%;
}
/* Clear floats after image containers */
.row {
  display: flex;
  margin: 25px;
}
</style>
<svg id="voronoi-holder" width="650" height="500"></svg>
*(Above, credits from [this github](https://bl.ocks.org/git-ashish/b04d673fbfc665f2c98f382e2c79a9ad) using d3 to render Voronoi tesselations in SVG).*

Lately we've seen a surge of interest towards *remote*. Working from home has become a standard under the current circumstances, and all have embraced this new way of organising and collaborating. While the principles of remote are explained at length in [the basecamp books](https://basecamp.com/books), and much can be found on the web -- see [the survival guide of Alexey](https://leanpub.com/working-from-fucking-home), to mention only one -- I find it interesting to look at remote in practice, inside the daily of an early stage company.

We have been practicing remote at *Searoutes* for 18 months now. Like many, we started inwards, looking at our values, and adjusted our method in iterations. We came to use a simple process built around a *heartbeat*, and a minimal toolkit we call *the SHAG* ! 

Whether you are just starting with remote, or already doing it, you will find that remote values can really transform your organization and the way you work. At our stage, no need for heavy collaboration tools, we are well aware that what works for us now may not work when we scale up. However, I can only encourage you to try to iterate with your teams, copy some of the ideas here, and adjust your way of doing remote.

## Behind our method and our tooling.

**:runner: Remote first.** [Searoutes](https:/www.searoutes.com) is a one year old company, with a team of 6, split between 2 offices in Germany and France. We support 36 clients with 4 API products distributing routes for vessels or containers, weather data, Co2 emissions and geocoding information to Maritime and Logistic companies.

From its infancy, the company was set up remote. By *remote* I mean *not colocated*. While we have 2 physical offices, team members choose to work from the coffee shop, their house, a co-working space or at a client's. We get together on a *heartbeat* (see next section) to groom, sprint, brainstorm or team build, but most of the work happens online.

This pushed forward strong *trust & transparency values* from day one, inspired originally from [Ray Dalio's *The Principles*](https://www.principles.com/). While we may not be *radically* transparent, everything we do at Searoutes is accessible to others. For remote to work, every team member had to be able to see how everyone else contributes to the company goals. Transparency was key.

Once trust was established, the impact of what we had just done became clear when I noticed we all had a different routing in place. In fact, we all know what works best for ourselves! We all know how to best get into the flow: music, a quiet space, the coffee shop, the library, doing sports before or a healthy skake.

**:muscle: Empowered first.** You cannot build a remote culture if you are imposing that your team be online from 9 to 5. This would be the digital equivalent of *managing chairs*, i.e. checking on everyone's clock. For our remote culture to strive and grow, we had to borrow from the *distributed* principles. By *distributed* I mean *not always online together*. Most of us are used to working that way already, with our accountant, lawyer, doctor. It means that we work together but asynchronously.

Working asynchronously meant taking extra care for clarity and dependency removal. We made sure everyone could deliver without waiting on others. Concretely, that meant organizing around *outcomes*. For us to be working asynchronously, and without having every one's inputs -- or the boss'! -- we focused on results and problems rather than on solutions. I strive to give context rather than direction. In that sense the OKR methodoly was perfectly suited for us.

**:globe_with_meridians: Product first.** Task lists may work in the physical world, where managers contantly remind you of items and prorities. Reshuffle it. And reshuffle it again. Every now and then, you may be pulled into a break out room with a slice of pizza to brainstorm and move the product forward, hoping everyone remembers the items described that day. If it sounds familiar, it's because too many teams still follow that task list model. It just does not work. Tasks are often unclear, they lack scope, purpose. Often, they have dependencies and require several iterations of explaining.

By putting the product first -- the company *is* a product, to use the words of [Marty Cagan](https://svpg.com/inspired-how-to-create-products-customers-love/) -- we achieve understanding, across the team, of what we are trying to build, and let everyone figure out the best to do it. Whether an hypothesis we are trying to validate, a new campaign we'd like to launch or a feature we wish to release, we focus on the outcome and the value for the customer. This feeds into empowerment, and allows the team to be remote first.

## Our process is a simple heartbeat.

<!-- <img src="https://miro.medium.com/max/1024/1*AfiA2Zrf24FFVLWoxkzXow.gif" class='img-center'/>
*(Above, credits from [this medium](https://heartbeat.fritz.ai/animated-stylegan-image-transitions-with-runwayml-57a2e20db80f) using p5.js to transition landscapes in cycle).* -->

We call it the *OKR and the Pie*. It's our answer to remote, empowered and product first. Put simply, it's a heartbeat which comes in two flavors, somewhat regular. The first, the OKRs, are set quartely, and allow us to pause and reflect on the bigger picture. The second, the Pie, works in sprint bundles, often close to 6 weeks, and provides focus. The two together allow us to switch context, and stay on the right pace.

**:dart: The OKRs.** Objectives & Key Results. In a nutshell: what are we trying to accomplish, and how do we measure it? We meet every quarter with the full team, usually physically in the same office, and discuss our goals for the upcoming months. It is a good time to communicate and refine the vision, and gather ideas on how everyone can best contribute. Also a good opportunity to reflect on our process, and make sure we are measuring what counts.

<img src="/img/OKR_O.png" class='img-center'/>
*(Above, our OKR planning at Searoutes for 20Q1, split in goals per field).*

<img src="/img/OKR_KR.png" class='img-center'/>
*(Above, the Key Results for Marketing supporting our 2 Marketing goals).*

Whether or not the framework is completly right, it's the discussion coming out of setting the objectives that matter. Because *the team sets its own goals*, there is buy-in of all participants. We all feel empowered, and responsible for achieving the goals we set out to establish.

**:pizza: The Pie.** The Pie is a bundle of sprints during which the team focuses. At Searoutes, this just happened over iterations: we realized that we often divided our work in iterations, brics or versions which last about 6 weeks. It seems to the be the right amount of time to build a prototype, a feature, clear uncertainty around a new tech, or validate assumptions around what clients may like. 

During my academic times, I was very fortunate to work with a thesis advisor who would always ask *"what is the simplest version of what you just told me? Can you prove that simplest version is true? Or can you find a counter argument to invalidate it?"*. In some sense, these academic principles are very close to the startup build-measure-learn philosophy. 

Since then I have pushed toward building in iterations, always the simplest version first. At each step of the way making sure we provide value. In the OKR framework, as we work towards objectives spanning several months, it makes sense for us to split quarters in pies, and iterating.

**:surfer: The Sprint.** This is our week's worth of work. It is not about going fast, but about scoping. At the beginning of every sprint, we put our OKRs on the (remote) board, and align against it. Sales, Marketing, Tech and Product all go through the same exercise: what do we achieve this week & how do we know we achieved it? During the sprint, we usually meet over breakfast to discuss topics not related to work, but likely to inspire or suggest new ideas. We close our sprints in a weekly meeting we call *friday for winners*, see [the book of C. Wodtke](http://eleganthack.com/radical-focus-is-here/), where we share new features, clients, leads, and briefly touch on what's next.

<img src="/img/sprint.png" class='img-center'/>
*(Above, one of our recent sprints. Stories are user focused, and estimated in amount of work client / server, and prioritized).*

In summary, the heartbeat is simple: 

- A few touch points everyweek: OKR planning, a breafast, Friday for winners.
- A few touch points every 6 weeks or so: the Pie.
- A few touch points every quarter or so: the OKRs.


## The *SHAG* toolkit.

SHAG stands for *Slack - Hubspot - Airtable - Github*. It is minimal, as you would expect from an early stage company of 6 people. It is designed to function remote & distributed, across all functions. Simply, it fits our heartbeat: the OKR / Pie / Sprint process.

**:speak_no_evil: Slack.** Emails are a bit old fashion, slack allows us to jump on a call right away, share giphies, files, and integrates with everything else: Hubspot, Airtable, Github. Realtime. You just need to know when to turn it off, in the same fashion you would turn off your email client, cell phone, etc.

**:raised_hands: Hubspot.** [Hubspot](https://www.hubspot.com/) concentrates all the activities that are customer facing. We especially enjoy their philosophie on inbound marketing and modern sales. We organize our leads acquisition process -- emails campains, forms, support -- and sales development on the platform.

**:orange_book: Airtable.** Generally speaking, we use [Airtable](https://airtable.com/) for everything organisational. From onboarding new team members, to gathering user feedback, to setting objectives for all parts of the business. It is as simple as a spreadsheet, but more colorful. As a bonus, it is easily exposable via API, and we actually have used it for simple projects as a (light) database.

**:gem: Github.** Do we need to say more?

## Closing

At Searoutes, we put transparency, independence and product first. After a few iterations, we organised our heartbeat around OKRs, Pies and Sprints. We meet every week and every quarter to align context, not tasks. This pushed us to use the *SHAG* toolkit. No overhead, everything happens online.

<img src="https://media.giphy.com/media/xUPGctM05XInxrxFNS/giphy.gif" class='img-center'/>

<!-- #### Acknowledgement

Thank you Antoine, this article improved in clarity thanks to your feedback! -->

<script src="https://d3js.org/d3.v4.min.js"></script>
<script type="text/javascript" src="/js/d3/voronoi.js"></script>
