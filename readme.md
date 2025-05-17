section.sectionName
    .container
        .sectionName__caption
            .sectionName__media
                img
            .sectionName__heading
                .sectionName__heading-title
                .sectionName__heading-info 
                .sectionName__heading-description
            .sectionName__content
            .sectionName__footer



section.sectionName
    .sectionName__backgound
    .container
        .sectionName__caption
            .sectionName__media
                +groupThumbnail()
                    +componentCardMedia()
            .sectionName__heading
                +groupHeading()
                    +componentTypographySubTitle()
                    +componentTypographyTitle()
                    +componentTypographyDescriptin()
                    +componentButtonExplore()
            .sectionName__content
            .sectionName__footer
                +groupFooter()
                    +componentListSimple()



// scss

+groupThumbnail()
    .groupThumbnail
        +componentCardThumbnail()

+groupHeading()
    .groupHeading
        .groupHeading__subtitle
            +componentTypographySubTitle()
        .groupHeading__title
            +componentTypographyTitle()
        .groupHeading__description



+componentTypographySubTitle()
    .componentTypographySubTitle
        | Studio Nuts®

+componentTypographyTitle()
    .componentTypographyTitle
        | Thinking boldly.
        br
        | Crafting visually.

+componentCardThumbnail()
    .componentCardThumbnail
        img




try

section.sectionHeroHorizontal
    .container
        .sectionHeroHorizontal__main
            .sectionHeroHorizontal__project
                +groupProjectHorizontal()
                    +cardProjectBasic()
            .sectionHeroHorizontal__heading
                +groupHeading()
                    +componentTypographySubTitle()
                    +componentTypographyTitle()
                    +componentTypographyDescriptin()
                    +componentButtonExplore()



// NOTE - Syarat dan ketentuan
// - jarak hanya di terapkan di [section, group]
//      - kecuali component yang berdiri sendiri seperti: Button, Link 
// - setiap heading/descripti wajib menggunakan component
// - Image wajib di rounded. [besar/20, kecil/10]
// - 

// NOTE - syarat center position
// - section-wrapper (like __description, __caption) gunakan grid
// - dan jika ingin center maka
        - text-align: center
            & > *{
                margin: 0 auto;
            }

https://jules-journey.framer.website/
https://jonas-template.framer.website/
https://theme.madsparrow.me/osty/


Imange
https://lenser.framer.website/works/leah-michelle


