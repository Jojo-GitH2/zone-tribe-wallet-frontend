import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

type WalletUpdateCallback = () => void;

export const startSignalRConnection = (
    onWalletUpdate: WalletUpdateCallback,
    onNotificationCreated: (notification: Notification) => void
) => {
    if (connection) return; // Prevent multiple connections

    connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:8080/hubs/transactions", {
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
            console.log("SignalR Connection Established");
            connection?.on("NotificationCreated", (notification: Notification) => {
                onNotificationCreated(notification);
                console.log("Notification received:", notification);
            });
            console.log("SignalR Notification Handler Registered");
        })
        .catch((err) => console.error("SignalR Connection Error:", err));
};

export const stopSignalRConnection = () => {
    if (connection) {
        connection.stop();
        connection = null;
    }
};