import ServiceList from "@/components/ServiceList"
import Introduction from "@/components/Introduction"
import Review from "@/components/Review"
import Achievement from "@/components/Achievement"
export default function HomePage() {
    return(
        <div>
            <Introduction></Introduction>
            <Achievement></Achievement>
            <Review></Review>
            <ServiceList></ServiceList>
        </div>
    )
}