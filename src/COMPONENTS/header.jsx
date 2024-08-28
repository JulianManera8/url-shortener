import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"


export default function Header() {

    const navigate = useNavigate()

    return (
        <nav>
            <Link to='/'> 
                <img className='h-20' src='/logo.png' alt='Trimrr logo' />
            </Link>

            <div>
                <Button onClick={() => navigate('/auth')}>Button</Button>
            </div>

        </nav>
    )
}   