import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React, { ReactNode } from 'react'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: ReactNode },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const OptionDialog: React.FC<{
    isVisible: boolean,
    title: string,
    description: string,
    secondaryButtonText: string,
    onSecondaryButtonClick: () => void,
    primaryButtonText: string,
    onPrimaryButtonClick: () => void
}> =
    ({
        isVisible,
        title,
        description,
        secondaryButtonText,
        onSecondaryButtonClick,
        primaryButtonText,
        onPrimaryButtonClick
    }) => {

        return (
            <div>
                <Dialog open={isVisible} TransitionComponent={Transition}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {description}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => onSecondaryButtonClick?.()}>
                            {secondaryButtonText}
                        </Button>
                        <Button onClick={() => onPrimaryButtonClick?.()} autoFocus>
                            {primaryButtonText}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

export default OptionDialog
