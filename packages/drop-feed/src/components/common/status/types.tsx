export type TStatus = 'active' | 'finished'

export type TProps = {
  status: TStatus;
  className?: string;
}