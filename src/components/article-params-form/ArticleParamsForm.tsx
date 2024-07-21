import { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import { Select } from '../select';

import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	update: (newArticleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ update }: ArticleParamsFormProps) => {
	const [modal, setModal] = useState(false);
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const modalRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: modal,
		onChange: setModal,
		rootRef: modalRef,
		onClose: () => setModal(false),
	});

	const openModal = () => {
		setModal(!modal);
	};

	const changeSubmit = (evt: React.FormEvent) => {
		evt.preventDefault();
		update(articleSettings);
	};

	const changeInput =
		(optionType: keyof ArticleStateType) => (data: OptionType) => {
			setArticleSettings((prevState) => ({
				...prevState,
				[optionType]: data,
			}));
		};

	const changeReset = () => {
		setArticleSettings(defaultArticleState);
		update(defaultArticleState);
	};

	return (
		<>
			<div ref={modalRef}>
				<ArrowButton onClick={openModal} inOpen={modal} />
				<aside
					className={clsx(styles.container, modal && styles.container_open)}>
					<form className={styles.form} onSubmit={changeSubmit}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							title='Шрифт'
							selected={articleSettings.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={changeInput('fontFamilyOption')}></Select>
						<RadioGroup
							name={'fontSize'}
							options={fontSizeOptions}
							selected={articleSettings.fontSizeOption}
							title={'Размер шрифта'}
							onChange={changeInput('fontSizeOption')}></RadioGroup>
						<Select
							title='Цвет шрифта'
							selected={articleSettings.fontColor}
							options={fontColors}
							onChange={changeInput('fontColor')}></Select>
						<Separator></Separator>
						<Select
							title='Цвет фона'
							selected={articleSettings.backgroundColor}
							options={backgroundColors}
							onChange={changeInput('backgroundColor')}></Select>
						<Select
							title='Ширина контента'
							selected={articleSettings.contentWidth}
							options={contentWidthArr}
							onChange={changeInput('contentWidth')}></Select>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={changeReset} />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};