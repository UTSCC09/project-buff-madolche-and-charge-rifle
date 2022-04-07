from locust import HttpUser, TaskSet, between, task
from credentials import USER_CREDENTIALS
import random
# import requests
# import json

# Based on:
# https://www.blazemeter.com/blog/how-to-run-locust-with-different-users
# https://www.contentful.com/blog/2021/01/14/GraphQL-via-HTTP-in-five-ways/

ALLOW_DUPLICATE_LOGINS = True
DEFAULT_EMAIL = "NOT_FOUND"
DEFAULT_PASSWORD = "NOT_FOUND"


class FrontendUserGet(HttpUser):
    weight = 1
    host = "https://mdtogether.live"
    wait_time = between(0.5, 2)

    @task
    def index(self):
        self.client.get("/")


class BackendUserGet(HttpUser):
    weight = 1
    host = "https://api.mdtogether.live"
    wait_time = between(0.5, 2)

    # @task
    # def graphql(self):
    #     self.client.get("/graphql")

    @task
    def peer(self):
        self.client.get("/peer")


class LoginWithUniqueUsersSteps(TaskSet):
    email = DEFAULT_EMAIL
    password = DEFAULT_PASSWORD

    def on_start(self):
        if ALLOW_DUPLICATE_LOGINS:
            self.email, self.password = USER_CREDENTIALS[random.randrange(len(USER_CREDENTIALS))]
        elif len(USER_CREDENTIALS) > 0:
            self.email, self.password = USER_CREDENTIALS.pop()

    @task
    def login(self):
        query = """query {{
            emailLogin(email:\"{email}\", password:\"{password}\"){{
              email
              token
              firstName
              lastName
            }}
        }}""".format(email=self.email, password=self.password)
        r = self.client.post(
            "https://api.mdtogether.live/graphql",
            json={"query": query})
        if r.status_code == 200:
            # print(json.dumps(r.json(), indent=2))
            print(
                "Login with %s email and %s password",
                self.email,
                self.password
            )
        else:
            # print(r._content)
            raise Exception(f"Query failed to run with a {r.status_code} - email: {self.email} password: {self.password}.")

    def on_stop(self):
        # re-insert current user credentials
        if not ALLOW_DUPLICATE_LOGINS:
            if self.email != DEFAULT_EMAIL and self.password != DEFAULT_PASSWORD:
                USER_CREDENTIALS.insert(0, (self.email, self.password))


class LoginWithUniqueUsersTest(HttpUser):
    weight = 10
    tasks = [LoginWithUniqueUsersSteps]
    host = "https://mdtogether.live"
    sock = None
    wait_time = between(0.5, 2)

    # def __init__(self):
    #     super(LoginWithUniqueUsersTest, self).__init__()
