import docker


client = docker.from_env()
container = client.containers.run(image='btcdeb', detach=True, command='/bin/sh', tty=True)



def simulate_script(script: str):
    print(f"\nCommand: btcdeb '[{script}]'\n")

    exit_code, output = container.exec_run(tty=True, cmd=f"btcdeb '[{script}]'")    # start btcdeb

    for line in output:
        print(line.decode('utf-8'))
    print()
    print(f'{exit_code=}')



if __name__ == "__main__":
    script = input("Enter Script: ")
    simulate_script(script)
