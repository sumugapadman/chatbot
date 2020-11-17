from rasa_sdk import Action
from rasa_sdk.events import SlotSet

class ActionAccountBalance(Action):
    def name(self):
        return "action_account_balance"

    def run(self, dispatcher, tracker, domain):
        balance = "You have $4001.05 in your account"
        dispatcher.utter_message(balance)
        return [SlotSet("account_balance", 4001.05)]
