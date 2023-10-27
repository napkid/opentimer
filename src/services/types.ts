

const TYPES = {
    Entrypoint: Symbol.for('Entrypoint'),
    Database: Symbol.for('Database'),
    Session: Symbol.for('Session'),
    BackgroundEvent: Symbol.for('BackgroudEvent'),
    ClientEvent: Symbol.for('ClientEvent'),
    ExtRuntime: Symbol.for('ExtRuntime'),
    Notification: Symbol.for('Notification'),
    Timer: Symbol.for('Timer'),
    Logger: Symbol.for('Logger'),
    Settings: Symbol.for('Settings'),
    Integrations: Symbol.for('Integrations')
}

export default TYPES

  