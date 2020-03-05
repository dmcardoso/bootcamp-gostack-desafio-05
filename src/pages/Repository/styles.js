import styled, { css } from 'styled-components';

export const Loading = styled('div')`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Owner = styled('header')`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #eee;

    a {
        color: #7159c1;
        font-size: 16px;
        text-decoration: none;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const IssueList = styled('ul')`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li {
            margin-top: 10px;
        }

        img {
            width: 36px;
            height: 36px;
        }

        div {
            flex: 1;
            margin-left: 15px;

            strong {
                font-size: 16px;

                a {
                    text-decoration: none;
                    color: #333;

                    &:hover {
                        color: #7159c1;
                    }
                }

                span {
                    background: #eee;
                    color: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    margin-left: 10px;
                    padding: 3px 4px;
                }
            }

            p {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }
    }
`;

export const Types = styled('div')`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 0 0 0;
`;

export const TypeIssue = styled('button')`
    display: flex;
    padding: 10px 5px;
    border: 1px solid #eee;
    border-radius: 4px;
    font-size: 16px;
    background: unset;
    color: #7158c1;
    ${(props) =>
        props.selected &&
        css`
            border-color: #7159c1;
        `}

    & + & {
        margin-left: 10px;
    }
`;

export const Pagination = styled('div')`
    width: 100%;
    padding-top: 25px;
    display: flex;
    justify-content: space-between;
`;
