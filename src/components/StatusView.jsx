import { clsx } from 'clsx'

export const StatusView = ({ message, className }) => (
    <div className={clsx('alert alert-danger', className)} role="alert">{message}</div>
)
