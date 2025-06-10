import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

type WalletUpdateCallback = () => void;

export const startSignalRConnection = (
    onWalletUpdate: WalletUpdateCallback,
    onTransactionReceived?: WalletUpdateCallback
) => {
    if (connection) return; // Prevent multiple connections

    connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5063/hubs/transactions", {
            accessTokenFactory: () => localStorage.getItem("accessToken") || ""
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        // .configureLogging(signalR.LogLevel.Debug)
        // .configureLogging(signalR.LogLevel.Error)
        .build();

    connection
        .start()
        .then(() => {
            connection?.on("WalletUpdated", () => {
                onWalletUpdate();
                console.log("Wallet updated, refreshing wallets");
            });
            if (onTransactionReceived) {
                connection?.on("TransactionReceived", () => {
                    onTransactionReceived();
                    console.log("Transaction received, refreshing wallets");
                });
            }
        })
        .catch((err) => console.error("SignalR Connection Error:", err));
};

export const stopSignalRConnection = () => {
    if (connection) {
        connection.stop();
        connection = null;
    }
};