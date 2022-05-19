<template>
  <div>
      <pre> {{ html }} </pre>
  </div>
</template>

<script>
import * as htmlparser2 from "htmlparser2"; 
import { render } from "dom-serializer";
import * as CSSselect from 'css-select';
import * as domutils from 'domutils';
import * as domhandler from 'domhandler';

console.log(domhandler);

export default {
    data() {
        return {
            html: `
                <!doctype html> 
                <!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ --> 
                <!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]--> 
                <!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]--> 
                <!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]--> 
                <!-- Consider adding a manifest.appcache: h5bp.com/d/Offline --> 
                <!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]--> 
                <head> 
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
                <meta name="viewport" 
                    content="width=device-width, initial-scale=1.0"/> 
                <title>Show Content</title> 
                <meta name="foo" content="bar"/> 
                <funky-bump></funky-bump> 
                <ak-stylesheets></ak-stylesheets> 
                <ak-headerJavaScript></ak-headerJavaScript> 
                <rss-header-meta href="/rss-for-header.xml"></rss-header-meta> 
                <external-stylesheet href="http://external.site/foo.css"></external-stylesheet> 
                <dns-prefetch control="we must have control"    
                            dnslist="foo1.com,foo2.com,foo3.com"></dns-prefetch> 
                <site-verification google="We are good"></site-verification> 
                <xml-sitemap></xml-sitemap> 
                <xml-sitemap href="/foo-bar-sitemap.xml"
                            title="Foo Bar Sitemap"></xml-sitemap> 
                </head> 
                <body> 
                <h1>Show Content</h1> 
                <section id="teaser"><ak-teaser></ak-teaser></section> 
                <article id="original">
                    <div class="article-head"><h2>Article title</h2></div>
                    <show-content id="simple" 
                                href="/shown-content.html"></show-content>
                    show-content id="dest" dest="http://dest.url" 
                                href="/shown-content.html"></show-content>
                    <show-content id="template"
                            template="ak_show-content-card.html.ejs"
                            href="/shown-content.html"
                            content-image="/imgz/shown-content-image.jpg">
                    Caption text
                    </show-content>
                    <p><show-content id="template2"
                            template="ak_show-content-card.html.ejs"
                            href="/shown-content.html"
                            dest="http://dest.url"
                            content-image="/imgz/shown-content-image.jpg">
                    Caption text
                    </show-content></p>
                </article>
                <ak-footerJavaScript></ak-footerJavaScript> 
                </body> 
                </html>
            `,
        };
    },
    mounted() { 
        // this.serilizeHtml();
        // this.cssSelectExample();
        this.domManipulate();
    },
    methods: {
        serilizeHtml() {
            const dom = htmlparser2.parseDocument(this.html);  
            console.log('dom', dom);  
            const serilzd = render(dom);
            this.html = serilzd;
            console.log('serilzd', serilzd);
        },
        cssSelectExample() {
            const dom = htmlparser2.parseDocument(this.html);
            for (let h1 of CSSselect.selectAll('h1', dom)) {
                console.log(`h1 ${render(h1)}`);
            }
            for (let articleHead of CSSselect.selectAll('article .article-head', dom)) {
                console.log(`articleHead ${render(articleHead)}`);
            }
            for (let articleHead of CSSselect.selectAll('article .article-head h1,h2,h3,h4,h5,h6', dom)) {
                console.log(`articleHead Hn ${render(articleHead)}`);
            }
            console.log(CSSselect.selectAll('article .article-head', dom));  
        },
        domManipulate() {
        const dom = htmlparser2.parseDocument(this.html);
        for (let fb of CSSselect.selectAll('funky-bump', dom)) {
            domutils.removeElement(fb);
        }
        for (let sm of CSSselect.selectAll('xml-sitemap', dom)) {
            // console.log(sm);
            if (sm.attribs.href) {
                const template = 
                '<link rel="sitemap" type="application/xml" href=""/>';
                const link = htmlparser2.parseDocument(template);
                const links = CSSselect.selectAll('link', link);
                links[0].attribs.href = sm.attribs.href;
                // console.log(`sitemap link ${render(link)}`);
                domutils.replaceElement(sm, link);
            } else {
                domutils.removeElement(sm);
            }
        }
        const serilzd = render(dom);
        console.log(serilzd);
        },
    },

}
</script>

<style>

</style>