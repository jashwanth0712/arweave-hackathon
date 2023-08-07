import subprocess
import json
import argparse
def get_drive_list(wallet_address):
    command = f'ardrive list-drive -w {wallet_address} -d {args.drive}'
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    return result.stdout
def get_build_file():
    cli_output = get_drive_list(args.wallet)
    print(cli_output)
    try:
        parsed_data = json.loads(cli_output)
        for i in parsed_data:
            if i['name'][:5] == "build":
                return i
    except json.JSONDecodeError as e:
        print("Error parsing JSON:", e)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Find and display object with a specified name from arweave list-drive output.')
    parser.add_argument('-w', '--wallet', type=str, required=True, help='Wallet address')
    parser.add_argument('-d', '--drive', type=str, required=True, help='drive address')
    args = parser.parse_args()
    get_build_file()


    