import { HeroSectionComponent } from "./section/HeroSectionComponent";

export default function HomePage(){

    return<div>
        <section>
            <HeroSectionComponent picturesList={['','','']}/>
        </section>
    </div>
}