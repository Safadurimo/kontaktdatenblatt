
# Kontaktdatenblatt - App
This app is an use case for sending messages about contact data in the german electricity market.

## Usecases

### Usecase 1: Updating its own conctact data

The first use case is to change your contact data and inform your marketpartners about it.

To perform this usecase, go to "Eigene Kontaktdaten", click "Editieren", change the value of the field and click "Save".

As a result under marketpartners, you will see that your own data has changed, and under "Nachrichten" you will see, that you have sent a message to all your marktpartners.


### Usecase 2: Receiving updated contact data from partners

The second usecase is to receive a message from a marketpartner which leads to an update of its contact data.

To simulate the receiving of a message, go to the menu item "Manuelle Nachricht einspielen". Paste the following code into the form ... 

```yaml
{
    "sender" : 2,
    "empfaenger": 1,
    "version" : 3,
    "ansprechpartner" : "Herr Puppi"
}
```
... and press "Nachricht einspielen".
As a result you will see a new message in "Nachrichten" und you will see the updated data for the corresponding marketpartner under "Marktpartner".

# Architecture
## Database design
The id 1 of the marketpartner is considered the data of its own system.

# Local Testing
Start the backend with "node index.js" and start the frontend with "npm start". The database is alread feed with some marktet partner data, so that you can jump direchtly into the use cases.

