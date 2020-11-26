export default interface ICommand<T> {
    getCommand(): string;
    execute(args: T): void;
}