export default class IDrop {
    public readonly ipfshash: string;
    public readonly metadata: TDropMetadata;
    public readonly chainId: number;
    public readonly tokenAddress: string;
    public readonly type: TDropType;
    public readonly claims: TRecipientsData;
    public readonly address: string;

    getRecipients(): string[] { }
    hasReceiverClaimed(recipient: string): bool { }
}
