import SchoolIcon from '@mui/icons-material/School'
import HandymanIcon from '@mui/icons-material/Handyman'
import GroupsIcon from '@mui/icons-material/Groups'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import HandshakeIcon from '@mui/icons-material/Handshake'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import Spa from '@mui/icons-material/Spa'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Circle from '@mui/icons-material/Circle'

const ActivityIcon = (props: { type: string, className?: string, }) => {
    switch (props.type) {
        case "education": return <SchoolIcon className={props.className} />
        case "recreational": return <AccessTimeIcon className={props.className} />
        case "social": return <GroupsIcon className={props.className} />
        case "diy": return <ColorLensIcon className={props.className} />
        case "charity": return <HandshakeIcon className={props.className} />
        case "cooking": return <RestaurantIcon className={props.className} />
        case "relaxation": return <Spa className={props.className} />
        case "music": return <MusicNoteIcon className={props.className} />
        case "busywork": return <HandymanIcon className={props.className} />
        default: return <Circle className={props.className} />
    }
}

export default ActivityIcon
