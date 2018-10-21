import os
import re 

def main():
    html_dir = './'
    list_files = os.listdir(html_dir)
    p = re.compile('html')

    for i in list_files:
        if i.endswith(".html"):
            name = re.sub(p, 'ejs', i)
            os.rename(os.path.join(html_dir, i), os.path.join(html_dir, name))

if __name__=='__main__':
    main()

