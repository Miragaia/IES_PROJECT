import os
import requests

class ApiHandler:

    def __init__(self):
        self.token = ''
        self.url = 'http://localhost:8080'
        self.headers = {'Authorization': 'Bearer ' + self.token, 'Content-Type': 'application/json'}
        self.tries = 0
        self.username = 'admin'
        self.password = 'password'
        self.login() 

    def login(self):
        response = requests.post(self.url + '/sensorsafe/login', json={'username': self.username, 'password': self.password})
        print("triyng to login to {}".format(self.url + "/login, with username: {} and password: {}".format(self.username, self.password)))

        if response.status_code == 200:
            self.token = response.json()['token']
            self.headers = {'Authorization': 'Bearer ' + self.token, 'Content-Type': 'application/json'}
            self.tries = 0

            print("login successful, token: {}".format(self.token))

        else:
            print("login failed, status code: {}".format(response.status_code))
            self.tries += 1

            if self.tries < 5:
                self.login()

            else:
                print("max tries reached, exiting")
                exit(1)

    def getSensors(self):
        response = requests.get(self.url + '/middleware/sensors', headers=self.headers)

        if response.status_code == 200:
            return response
        elif response.status_code == 401:
            self.login()
            return None
        else:
            print("getSensors failed, status code: {}".format(response.status_code))
            return None
        
    def getAvailableSensors(self):
        response = requests.get(self.url + '/middleware/sensors/available', headers=self.headers)

        if response.status_code == 200:
            return response
        elif response.status_code == 401:
            self.login()
            return None
        else:
            print("getAvailableSensors failed, status code: {}".format(response.status_code))
            return None
        
    def addAvailableSensor(self, sensor):
        response = requests.post(self.url + '/middleware/sensors/available', headers=self.headers, json=sensor)

        if response.status_code == 200:
            return response
        elif response.status_code == 401:
            self.login()
            return None
        else:
            print("addAvailableSensor failed, status code: {}".format(response.status_code))
            return None
        
    def getAutomationRules(self):
        response = requests.get(self.url + '/middleware/automation/rules', headers=self.headers)

        if response.status_code == 200:
            return response
        elif response.status_code == 401:
            self.login()
            return None
        else:
            print("getAutomationRules failed, status code: {}".format(response.status_code))
            return None
        
    def putState(self, sensor):
        response = requests.put(self.url + '/middleware/devices/sensor', headers=self.headers, json=sensor)

        if response.status_code == 200:
            return response
        elif response.status_code == 401:
            self.login()
            return None
        else:
            print("putState failed, status code: {}".format(response.status_code))
            return None
if __name__ == '__main__':
    api = ApiHandler()
    print(api.getSensors().json())
    print(api.getAvailableSensors().json())
 
 